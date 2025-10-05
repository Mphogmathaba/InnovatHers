using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stokvel_backend.Models
{
    // 1️ USER MODEL
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(100)]
        public string Surname { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        public string? ProfileImageUrl { get; set; }

        // Language settings (11 official languages)
        public LanguagePreference LanguagePreference { get; set; } = LanguagePreference.English;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<GroupMember> GroupMemberships { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<MeetingUser> MeetingUsers { get; set; } = new List<MeetingUser>();
    }

    // 2️ STOKVEL GROUP MODEL
    public class StokvelGroup
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string GroupName { get; set; }

        public string Description { get; set; }

        // Burial, Grocery, Investment, Travel, etc.
        public string StokvelType { get; set; }

        public decimal MonthlyContributionAmount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; }

        // Navigation
        public ICollection<GroupMember> Members { get; set; }
        public ICollection<Contribution> Contributions { get; set; }
        public ICollection<Payout> Payouts { get; set; }
        public ICollection<Meeting> Meetings { get; set; }
    }

    // 3️ GROUP MEMBER MODEL (Join Table)
    public class GroupMember
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int StokvelGroupId { get; set; }
        public StokvelGroup StokvelGroup { get; set; }

        // Roles: Chairperson, Treasurer, Member, etc.
        [Required]
        public string Role { get; set; } = "Member";

        public bool IsActive { get; set; } = true;

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }

    // 4️ CONTRIBUTION MODEL
    public class Contribution
    {
        public int Id { get; set; } 

        [Required]
        public int GroupId { get; set; }
        public StokvelGroup Group { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime DateContributed { get; set; } = DateTime.UtcNow;

        // PaymentMethod: EFT, Cash, PayShap, etc.
        [MaxLength(50)]
        public string PaymentMethod { get; set; }

        public string? ProofOfPaymentUrl { get; set; }

        public bool IsVerified { get; set; } = false;
    }

    // 5️⃣ PAYOUT MODEL
    public class Payout
    {
        public int Id { get; set; }

        [Required]
        public int GroupId { get; set; }
        public StokvelGroup Group { get; set; }

        [Required]
        public int ReceiverId { get; set; }
        public User Receiver { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime PayoutDate { get; set; }

        public bool IsCompleted { get; set; } = false;
    }

    // 6️ MEETING MODEL
    public class Meeting
    {
        public int Id { get; set; }

        [Required]
        public int GroupId { get; set; }
        public StokvelGroup Group { get; set; }

        [Required]
        public int OrganizerId { get; set; }
        [ForeignKey("OrganizerId")]
        public virtual User Organizer { get; set; }

        [Required]
        public string Title { get; set; }
        public string? Agenda { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }

        [Required]
        public DateTime EndDateTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string Status { get; set; } = "Scheduled";

        public string Recurrence { get; set; } = "None";
        public DateTime? RecurrenceEndDate { get; set; }

        [StringLength(100)]
        public string? RecurrenceGroupId { get; set; }

        public string Location { get; set; }

        public string? Notes { get; set; }
        public ICollection<MeetingDocument> Documents { get; set; }

        public ICollection<MeetingUser> MeetingUsers { get; set; } = new List<MeetingUser>();
    }

    public class MeetingUser
    {
        public int MeetingId { get; set; }
        public int UserId { get; set; }
        public string ResponseStatus { get; set; } // e.g. "Accepted", "Declined"
        public bool Attended { get; set; }

        public Meeting Meeting { get; set; }
        public User User { get; set; }
        public InviteStatus InviteStatus { get; set; }

    }
    // 7️⃣ MEETING DOCUMENT MODEL
    public class MeetingDocument
    {
        public int Id { get; set; }

        [Required]
        public int MeetingId { get; set; }
        public Meeting Meeting { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string FileUrl { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }

    // 8️⃣ TRANSACTION MODEL
    public class Transaction
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string TransactionType { get; set; } // "Contribution", "Payout", "Expense"

        public decimal Amount { get; set; }

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        public string? Reference { get; set; }
    }

    // 9️⃣ NOTIFICATION MODEL
    public class Notification
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // 🔟 ENUM: LANGUAGE PREFERENCE
    public enum LanguagePreference
    {
        English,
        isiZulu,
        isiXhosa,
        Afrikaans,
        Sepedi,
        Setswana,
        Sesotho,
        Xitsonga,
        siSwati,
        Tshivenda,
        isiNdebele
    }

    public enum InviteStatus
    {
        Pending,
        Accepted,
        Declined,
        Cancelled
    }

}
