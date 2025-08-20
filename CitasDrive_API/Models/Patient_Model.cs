using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitasDrive_API.Models
{
    [Table("paciente")]
    public class Patient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_paciente { get; set; }
        public string tipo_docum { get; set; }
        public string num_docum { get; set; }
        public string nombre { get; set; }
        public string genero { get; set; }
        public DateTime fecha_nacim { get; set; }
        public string num_celular { get; set; }
       
    }
}