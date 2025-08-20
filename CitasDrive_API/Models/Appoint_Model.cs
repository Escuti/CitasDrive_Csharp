using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitasDrive_API.Models
{
    [Table("citas")]
    public class Appoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_cita { get; set; }
        public DateTime fecha_cita { get; set; }
        public TimeOnly hora_inicio { get; set; }
        public TimeOnly hora_fin { get; set; }
        public string doc_asig { get; set; }
        public int pacienteFK { get; set; }

    }
}