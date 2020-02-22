package br.com.product.app.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.InputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.File;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;

@CrossOrigin
@RestController
@RequestMapping("/images")
public class ImageController {

  @GetMapping("{pid}")
  public void downloadImage(@PathVariable("pid") String pid, HttpServletResponse response)
  {
    try {
      File fileToDownload = new File("/product-app/uploads/" + pid);

      try (InputStream inputStream = new FileInputStream(fileToDownload)) {
        response.setContentType("application/force-download");
        response.setHeader("Content-Disposition", "attachment; filename=" + pid);
        IOUtils.copy(inputStream, response.getOutputStream());
        response.flushBuffer();
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @PostMapping
  public ResponseEntity<?> uploadImage(
    @RequestParam("pid") String pid, // photo id
    @RequestParam("file") MultipartFile file
  ) {
    if (file.isEmpty()) {
      throw new RuntimeException("File given is not valid!");
    }

    String folder = "/product-app/uploads/";

    try {
      Path pathFolder = Paths.get(folder);
      Files.createDirectories(pathFolder);

      Path pathFile = Paths.get(folder + pid);
      Files.write(pathFile, file.getBytes());

    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    return new ResponseEntity(HttpStatus.OK);
  }

  @DeleteMapping("{pid}")
  public void deleteFile(@PathVariable("pid") String pid)
  {
    try {
      Path fileToDelete = Paths.get("/product-app/uploads/" + pid); 

      if (Files.exists(fileToDelete)) {
        Files.delete(fileToDelete);
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

}