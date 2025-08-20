using CitasDrive_API.Data;
using CitasDrive_API.Models;
using Microsoft.EntityFrameworkCore;

namespace CitasDrive_API.Services
{
    public class PatientService
    {
        private readonly AppDBContext _context;

        public PatientService(AppDBContext context)
        {
            _context = context;
        }

        public APIresponse<List<Patient>> GetAll()
        {
            var patients = _context.Patients.ToList();
            return new APIresponse<List<Patient>>(true, "Pacientes desplegados", patients);
        }

        public APIresponse<Patient> GetById(int id)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.id_paciente == id);

            if (patient == null)
            {
                var neg_response = new APIresponse<Patient>(false, "Paciente no encontrado", null);
                return neg_response;
            }
            else
            {
                var pos_response = new APIresponse<Patient>(true, "Paciente desplegado", patient);
                return pos_response;
            }
        }

        public APIresponse<Patient> Add(Patient patient)
        {
            if (patient == null)
            {
                var neg_response = new APIresponse<Patient>(false, "No se pudo crear el registro", null);//Se puede mejorar evaluación y falta evaluar si ya existe ese registro con email
                return neg_response;
            }

            int patientAge = DateTime.Now.Year - patient.fecha_nacim.Year;//Calculo de la edad del paciente
            if (DateTime.Now < patient.fecha_nacim.Date.AddYears(patientAge))//Evaluacion para ver si ya cumplio años
            {
                patientAge--;
            }

            if (patient.tipo_docum.ToLower() == "cédula" && patientAge < 18)
            {
                var neg_response = new APIresponse<Patient>(false, "Paciente no es mayor de edad, por favor elija otro tipo de documento", null);
                return neg_response;
            }

            _context.Patients.Add(patient);
            _context.SaveChanges();

            var pos_response = new APIresponse<Patient>(true, "Paciente creado", patient);

            return pos_response;
        }

        public APIresponse<Patient> Update(int id, Patient updated)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.id_paciente == id);
            if (patient == null)
            {
                var neg_response = new APIresponse<Patient>(false, "Paciente no encontrado", null);
                return neg_response;
            }

            int patientAge = DateTime.Now.Year - patient.fecha_nacim.Year;//Calculo de la edad del paciente
            if (DateTime.Now < patient.fecha_nacim.Date.AddYears(patientAge))//Evaluacion para ver si ya cumplio años
            {
                patientAge--;
            }

            if (patient.tipo_docum.ToLower() == "cédula" && patientAge < 18)
            {
                var neg_response = new APIresponse<Patient>(false, "Paciente no es mayor de edad, por favor elija otro tipo de documento", null);
                return neg_response;
            }

            updated.id_paciente = id;//Aseguramos que siempre tome el id insertado
            _context.Entry(patient).CurrentValues.SetValues(updated);
            _context.SaveChanges();

            var pos_response = new APIresponse<Patient>(true, "Paciente actualizado", updated);
            return pos_response;
        }

        public APIresponse<Patient> Delete(int id)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.id_paciente == id);
            if (patient == null)
            {
                var neg_response = new APIresponse<Patient>(false, "Paciente no encontrado", null);
                return neg_response;
            }

            _context.Patients.Remove(patient);
            _context.SaveChanges();

            var pos_response = new APIresponse<Patient>(true, "Paciente eliminado", patient);
            return pos_response;
        }
    }
}