using Microsoft.EntityFrameworkCore;
using CitasDrive_API.Models;

namespace CitasDrive_API.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appoint> Appoints { get; set; }

    }
}