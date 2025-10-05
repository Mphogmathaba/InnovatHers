using Microsoft.EntityFrameworkCore;
using Stokvel_backend.Models;

namespace Stokvel_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MeetingUser> MeetingUsers { get; set; }

        //This is where OnModelCreating goes
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Define relationships and composite keys here
            modelBuilder.Entity<MeetingUser>()
                .HasKey(mu => new { mu.MeetingId, mu.UserId });

            modelBuilder.Entity<MeetingUser>()
                .HasOne(mu => mu.Meeting)
                .WithMany(m => m.MeetingUsers)
                .HasForeignKey(mu => mu.MeetingId);

            modelBuilder.Entity<MeetingUser>()
                .HasOne(mu => mu.User)
                .WithMany(u => u.MeetingUsers)
                .HasForeignKey(mu => mu.UserId);
        }
    }
}

