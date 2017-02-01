using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using MyLOB.WebAPI.Models;
using Newtonsoft.Json;

namespace MyLOB.WebAPI.Repositories
{
    public class ProductRepository
    {
        internal Product Create()
        {
            Product product = new Product
            {
                ReleaseDate = DateTime.Now
            };
            return product;
        }

        internal List<Product> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/product.json");

            var json = System.IO.File.ReadAllText(filePath);

            var products = JsonConvert.DeserializeObject<List<Product>>(json);

            return products;
        }

        internal bool Delete(int productId)
        {
            // Read in the existing products
            var products = this.Retrieve();

            // Locate and replace the item
            var itemIndex = products.FindIndex(p => p.ProductId == productId);
            if (itemIndex > 0)
            {
                products.RemoveAt(itemIndex);
            }
            else
            {
                return false;
            }

            WriteData(products);
            return true;
        }

        internal Product Save(Product product)
        {
            // Read in the existing products
            var products = this.Retrieve();

            // Assign a new Id
            var maxId = products.Max(p => p.ProductId);
            product.ProductId = maxId + 1;
            products.Add(product);

            WriteData(products);
            return product;
        }

        internal Product Save(int id, Product product)
        {
            // Read in the existing products
            var products = this.Retrieve();

            // Locate and replace the item
            var itemIndex = products.FindIndex(p => p.ProductId == product.ProductId);
            if (itemIndex > 0)
            {
                products[itemIndex] = product;
            }
            else
            {
                return null;
            }

            WriteData(products);
            return product;
        }
        private bool WriteData(List<Product> products)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/product.json");

            var json = JsonConvert.SerializeObject(products, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }
    }
}