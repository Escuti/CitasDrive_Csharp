using CitasDrive_API.Models;
using CitasDrive_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CitasDrive_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointController : ControllerBase
    {
        private readonly AppointService _service;

        public AppointController(AppointService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var response = _service.GetAll();
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var response = _service.GetById(id);
            if (response.Success)
                return Ok(response);
            return NotFound(response);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Appoint appoint)
        {
            var response = _service.Add(appoint);
            if (response.Success)
                return CreatedAtAction(nameof(GetById), new { id = response.Data.id_cita }, response);
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Appoint appoint)
        {
            var response = _service.Update(id, appoint);
            if (response.Success)
                return Ok(response);
            if (response.Message.Contains("no encontrada"))
                return NotFound(response);
            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = _service.Delete(id);
            if (response.Success)
                return Ok(response);
            return NotFound(response);
        }
    }
}