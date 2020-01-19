package br.com.product.app.controllers;

import br.com.product.app.models.Product;
import br.com.product.app.repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository)
    {
        this.repository = repository;
    }

    // constructor (private productRepository: ProductRepository) {}

    @GetMapping
    public List<Product> findAll()
    {
        return this.repository.findAll();
    }

    @GetMapping("/{id}")
    public Product find(@PathVariable("id") Long id)
    {
        Optional<Product> optional = this.repository.findById(id);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new RuntimeException("Product with id " + id + " not found");
        }
    }

    @PostMapping
    public Product save(@RequestBody Product product)
    {
        if (product.getBarcode() == null || product.getDescription() == null || product.getPrice() == null) {
            throw new RuntimeException("Invalid data");
        }

        return this.repository.save(product);
    }

    @DeleteMapping("/{id}")
    public Product delete(@PathVariable(name = "id") Long id)
    {
        Optional<Product> optional = this.repository.findById(id);

        if (optional.isPresent()) {
            Product product = optional.get();

            this.repository.deleteById(id);

            return product;
        } else {
            throw new RuntimeException("Product with id " + id + " not found");
        }
    }

}
