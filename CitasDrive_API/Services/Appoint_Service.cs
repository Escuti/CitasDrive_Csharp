using CitasDrive_API.Data;
using CitasDrive_API.Models;
using Microsoft.EntityFrameworkCore;

namespace CitasDrive_API.Services
{
    public class AppointService
    {
        private readonly AppDBContext _context;

        public AppointService(AppDBContext context)
        {
            _context = context;
        }

        public APIresponse<List<Appoint>> GetAll()
        {
            var appoints = _context.Appoints.ToList();

            var pos_response = new APIresponse<List<Appoint>>(true, "Citas desplegadas", appoints);
            return pos_response;
        }

        public APIresponse<Appoint> GetById(int id)
        {
            var appoint = _context.Appoints.FirstOrDefault(p => p.id_cita == id);

            if (appoint == null)
            {
                var neg_response = new APIresponse<Appoint>(false, "Cita no encontrada", null);
                return neg_response;
            }
            else
            {
                var pos_response = new APIresponse<Appoint>(true, "Cita desplegada", appoint);
                return pos_response;
            }
        }

        public APIresponse<Appoint> Add(Appoint appoint)
        {
            if (appoint == null)
            {
                var neg_response = new APIresponse<Appoint>(false, "No se pudo crear la cita", null);
                return neg_response;
            }

            var timeAppoint = appoint.hora_fin - appoint.hora_inicio;
            if (timeAppoint.TotalMinutes > 60) //Cita no dure màs de 1hora
            {
                var neg_response = new APIresponse<Appoint>(false, "La cita no puede durar más de 60 minutos", null);
                return neg_response;
            }

            if (appoint.fecha_cita.Date < DateTime.Now.Date) // Evaluar que no se cree citas en fechas pasadas
            {
                var neg_response = new APIresponse<Appoint>(false, "La cita no puede ser en una fecha pasada", null);
                return neg_response;
            }

            bool dupAppoint = _context.Appoints.Any(a =>
                a.fecha_cita == appoint.fecha_cita &&
                a.doc_asig == appoint.doc_asig &&
                ((appoint.hora_inicio >= a.hora_inicio && appoint.hora_inicio < a.hora_fin) ||
                 (appoint.hora_fin > a.hora_inicio && appoint.hora_fin <= a.hora_fin))
            );

            if (dupAppoint) // cita dupliacada en doctor
            {
                var neg_response = new APIresponse<Appoint>(false, "Ya existe una cita para ese doctor en ese horario", null);
                return neg_response;
            }

            _context.Appoints.Add(appoint);
            _context.SaveChanges();

            var pos_response = new APIresponse<Appoint>(true, "Cita creada", appoint);
            return pos_response;
        }

        public APIresponse<Appoint> Update(int id, Appoint updated)
        {
            var appoint = _context.Appoints.FirstOrDefault(p => p.id_cita == id);

            if (appoint == null)
            {
                var neg_response = new APIresponse<Appoint>(false, "Cita no encontrada", null);
                return neg_response;
            }

            var timeAppoint = updated.hora_fin - updated.hora_inicio;
            if (timeAppoint.TotalMinutes > 60) //Cita no dure màs de 1hora
            {
                var neg_response = new APIresponse<Appoint>(false, "La cita no puede durar más de 60 minutos", null);
                return neg_response;
            }

            if (updated.fecha_cita.Date < DateTime.Now.Date) // Evaluar que no se cree citas en fechas pasadas
            {
                var neg_response = new APIresponse<Appoint>(false, "La cita no puede ser en una fecha pasada", null);
                return neg_response;
            }

            bool dupAppoint = _context.Appoints.Any(a =>
                a.id_cita != id && 
                a.fecha_cita == updated.fecha_cita &&
                a.doc_asig == updated.doc_asig &&
                ((updated.hora_inicio >= a.hora_inicio && updated.hora_inicio < a.hora_fin) ||
                 (updated.hora_fin > a.hora_inicio && updated.hora_fin <= a.hora_fin))
            );

            if (dupAppoint) // cita dupliacada en doctor
            {
                var neg_response = new APIresponse<Appoint>(false, "Ya existe una cita para ese doctor en ese horario", null);
                return neg_response;
            }

            updated.id_cita = id;
            _context.Entry(appoint).CurrentValues.SetValues(updated);
            _context.SaveChanges();

            var pos_response = new APIresponse<Appoint>(true, "Cita actualizada", updated);
            return pos_response;
        }

        public APIresponse<Appoint> Delete(int id)
        {
            var appoint = _context.Appoints.FirstOrDefault(p => p.id_cita == id);

            if (appoint == null)
            {
                var neg_response = new APIresponse<Appoint>(false, "Cita no encontrada", null);
                return neg_response;
            }

            _context.Appoints.Remove(appoint);
            _context.SaveChanges();

            var pos_response = new APIresponse<Appoint>(true, "Cita eliminada", appoint);
            return pos_response;
        }
    }
}