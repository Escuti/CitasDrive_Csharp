using CitasDrive_API.Models;
using CitasDrive_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CitasDrive_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly PatientService _patientService;

        public PatientController(PatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var response = _patientService.GetAll();
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var response = _patientService.GetById(id);
            if (response.Success)
                return Ok(response);
            return NotFound(response);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Patient patient)
        {
            var response = _patientService.Add(patient);
            if (response.Success)
                return CreatedAtAction(nameof(GetById), new { id = response.Data.id_paciente }, response);
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Patient patient)
        {
            var response = _patientService.Update(id, patient);
            if (response.Success)
                return Ok(response);
            if (response.Message.Contains("no encontrado"))
                return NotFound(response);
            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = _patientService.Delete(id);
            if (response.Success)
                return Ok(response);
            return NotFound(response);
        }
    }
}