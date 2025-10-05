using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stokvel_backend.Data;
using Stokvel_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace StokvelFrontEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MeetingController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ 1. Create a new meeting (automatically invite all stokvel members)
        [HttpPost("create-meeting")]
        public async Task<IActionResult> CreateMeeting([FromBody] MeetingDto meetingDto)
        {
            if (meetingDto == null)
                return BadRequest("Invalid meeting data.");

            var organizer = await _context.Users.FindAsync(meetingDto.Organizer.Id);
            if (organizer == null)
                return NotFound("Organizer not found.");

            var stokvelMembers = await _context.Users.ToListAsync();

            var meeting = new Meeting
            {
                Title = meetingDto.Title,
                Agenda = meetingDto.Agenda,
                OrganizerId = meetingDto.Organizer.Id,
                StartDateTime = meetingDto.StartDateTime,
                EndDateTime = meetingDto.EndDateTime,
                Status = "Scheduled",
                Recurrence = meetingDto.Recurrence,
                RecurrenceEndDate = meetingDto.RecurrenceEndDate,
                RecurrenceGroupId = meetingDto.RecurrenceGroupId
            };

            _context.Meetings.Add(meeting);
            await _context.SaveChangesAsync();

            // Automatically add all stokvel members to MeetingUsers
            var meetingUsers = stokvelMembers.Select(u => new MeetingUser
            {
                MeetingId = meeting.Id,
                UserId = u.Id,
                InviteStatus = (u.Id == meetingDto.Organizer.Id) ? InviteStatus.Accepted : InviteStatus.Pending
            }).ToList();


            _context.MeetingUsers.AddRange(meetingUsers);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Meeting created successfully", meetingId = meeting.Id });
        }

        // GET: api/meeting/get-meetings
[HttpGet("get-meetings")]
public async Task<ActionResult<IEnumerable<MeetingDto>>> GetMeetings(
    [FromQuery] string? userId,
    [FromQuery] string? status,
    [FromQuery] DateTime? dateFrom,
    [FromQuery] DateTime? dateTo)
{
    var query = _context.Meetings
        .Include(m => m.Organizer)
        .Include(m => m.MeetingUsers)
            .ThenInclude(mu => mu.User)
        .AsQueryable();

    if (!string.IsNullOrEmpty(status))
        query = query.Where(m => m.Status.ToLower() == status.ToLower());

    if (dateFrom.HasValue)
        query = query.Where(m => m.StartDateTime >= dateFrom.Value);

    if (dateTo.HasValue)
        query = query.Where(m => m.EndDateTime <= dateTo.Value);

            if (!string.IsNullOrEmpty(userId) && int.TryParse(userId, out var userIdInt))
            {
                query = query.Where(m => m.MeetingUsers.Any(mu => mu.UserId == userIdInt));
            }

            var meetings = await query.OrderByDescending(m => m.StartDateTime).ToListAsync();

    var dtos = meetings.Select(m => new MeetingDto
    {
        Id = m.Id,
        Title = m.Title,
        Agenda = m.Agenda,
        Organizer = new UserInfoDto
        {
            Id = m.Organizer.Id,
            Name = m.Organizer.Name,
            Surname = m.Organizer.Surname,
            Email = m.Organizer.Email
        },
        StartDateTime = m.StartDateTime,
        EndDateTime = m.EndDateTime,
        Status = m.Status,
        Recurrence = m.Recurrence,
        RecurrenceEndDate = m.RecurrenceEndDate,
        RecurrenceGroupId = m.RecurrenceGroupId,
        InvitedUsers = m.MeetingUsers.Select(mu => new UserInfoDto
        {
            Id = mu.User.Id,
            Name = mu.User.Name,
            Surname = mu.User.Surname,
            Email = mu.User.Email,
            InviteStatus = mu.InviteStatus.ToString() // convert enum to string
        }).ToList()
    }).ToList();

    return Ok(dtos);
}

// PUT: api/meeting/update-invite-status
[HttpPut("update-invite-status")]
public async Task<IActionResult> UpdateInviteStatus([FromBody] UpdateInviteStatusDto updateDto)
{
    var meetingUser = await _context.MeetingUsers
        .FirstOrDefaultAsync(mu => mu.MeetingId == updateDto.MeetingId && mu.UserId == updateDto.UserId);

    if (meetingUser == null)
        return NotFound("User not found in meeting.");

    // Assign enum instead of string
    if (!Enum.TryParse<InviteStatus>(updateDto.InviteStatus, true, out var statusEnum))
        return BadRequest("Invalid invite status.");

    meetingUser.InviteStatus = statusEnum;
    await _context.SaveChangesAsync();

    return Ok(new { message = "Invite status updated successfully." });
}

// PUT: api/meeting/cancel-meeting/{meetingId}
[HttpPut("cancel-meeting/{meetingId}")]
public async Task<IActionResult> CancelMeeting(int meetingId)
{
    var meeting = await _context.Meetings.FindAsync(meetingId);
    if (meeting == null)
        return NotFound("Meeting not found.");

    meeting.Status = "Cancelled";
    await _context.SaveChangesAsync();

    return Ok(new { message = "Meeting cancelled successfully." });
}


        // ✅ 5. Delete meeting
        [HttpDelete("delete-meeting/{id}")]
        public async Task<IActionResult> DeleteMeeting(int id)
        {
            var meeting = await _context.Meetings
                .Include(m => m.MeetingUsers)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (meeting == null)
                return NotFound("Meeting not found.");

            _context.MeetingUsers.RemoveRange(meeting.MeetingUsers);
            _context.Meetings.Remove(meeting);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Meeting deleted successfully." });
        }
    
        [HttpDelete("series/{groupId}")]
        public async Task<IActionResult> DeleteMeetingSeries(string groupId)
        {
            if (string.IsNullOrWhiteSpace(groupId))
                return BadRequest(new { message = "Invalid recurrence group id." });

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var meetings = await _context.Meetings
                .Where(m => m.RecurrenceGroupId == groupId)
                .ToListAsync();

            if (!meetings.Any())
                return NotFound(new { message = "No meetings found for this recurrence group." });

            var title = meetings.First().Title;
            var recurrence = meetings.First().Recurrence;
            var rangeStart = meetings.Min(m => m.StartDateTime);
            var rangeEnd = meetings.Max(m => m.EndDateTime);
            _context.Meetings.RemoveRange(meetings);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Meeting series deleted.", deletedCount = meetings.Count });
        }
        public class MeetingDto
        {
            public int Id { get; set; }
            public string Title { get; set; } = string.Empty;
            public string? Agenda { get; set; }
            public UserInfoDto Organizer { get; set; }
            public string? MeetingTypeName { get; set; }
            public DateTime StartDateTime { get; set; }
            public DateTime EndDateTime { get; set; }
            public DateTime CreatedAt { get; set; }
            public string Status { get; set; } = string.Empty;
            public List<UserInfoDto> InvitedUsers { get; set; } = new(); 
            public string? Recurrence { get; set; }
            public DateTime? RecurrenceEndDate { get; set; }
            public string? RecurrenceGroupId { get; set; }
        }

        public class MeetingCreateDto
        {
            public string Title { get; set; } = string.Empty;
            public string? Agenda { get; set; }
            public int MeetingTypeId { get; set; }
            public DateTime StartDateTime { get; set; }
            public DateTime EndDateTime { get; set; }
            public List<string> InvitedUserIds { get; set; } = new();
            public string? Recurrence { get; set; }
            public DateTime? RecurrenceEndDate { get; set; }
        }

        public class MeetingUpdateDto
        {
            public string? Title { get; set; }
            public string? Agenda { get; set; }
            public DateTime? StartDateTime { get; set; }
            public DateTime? EndDateTime { get; set; }
            public string? Status { get; set; }
            public string? Recurrence { get; set; }
            public DateTime? RecurrenceEndDate { get; set; }
            public List<string>? InvitedUserIds { get; set; }
        }



        public class UserInfoDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
            public string InviteStatus { get; set; } = "Pending"; // default
        }

        public class UpdateInviteStatusDto
        {
            // The meeting the user is responding to
            public int MeetingId { get; set; }

            // The user who is responding
            public int UserId { get; set; }

            // The new invite status: "Accepted", "Declined", etc.
            public string InviteStatus { get; set; } = "Pending";
        }



    }
}


