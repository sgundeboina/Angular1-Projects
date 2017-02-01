using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.OData;
using MyLOB.WebAPI.Models;
using MyLOB.WebAPI.Repositories;

namespace MyLOB.WebAPI.Controllers
{

    [EnableCorsAttribute("*", "*", "*")]
    public class ProductsController : ApiController
    {
        // GET: api/Products
        [EnableQuery()]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            try
            {
                var productRepo = new ProductRepository();
                return Ok(productRepo.Retrieve().AsQueryable());
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }

        }


        ////public IEnumerable<Product> Get(string search) 'Regular without OData
        //[EnableQuery()]
        //public IQueryable<Product> Get(string search)
        //{
        //    var productRepo = new ProductRepository();
        //    var products = productRepo.Retrieve();
        //    if (search != "*")
        //    {
        //        return products.Where(p => p.ProductCode.Contains(search)).AsQueryable();
        //    }
        //    else
        //    {
        //        return products.AsQueryable();
        //    }

        //}


        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Product product;
                var productRepository = new ProductRepository();

                if (id > 0)
                {
                    var products = productRepository.Retrieve();
                    product = products.FirstOrDefault(p => p.ProductId == id);
                    if (product == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    product = productRepository.Create();
                }
                return Ok(product);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }

        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult Post([FromBody] Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product can't be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (product.ProductId > 0)
                {
                    var productRepository = new ProductRepository();
                    var newProduct = productRepository.Save(product.ProductId, product);
                    if (newProduct == null)
                    {
                        return Conflict();
                    }
                    return Ok(newProduct);
                }
                else
                {
                    var productRepository = new ProductRepository();
                    var newProduct = productRepository.Save(product);
                    if (newProduct == null)
                    {
                        return Conflict();
                    }
                    return Created(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var productRepository = new ProductRepository();
                var updatedProduct = productRepository.Save(id, product);
                if (updatedProduct == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
            var productRepository = new ProductRepository();
            productRepository.Delete(id);
        }
    }
}
