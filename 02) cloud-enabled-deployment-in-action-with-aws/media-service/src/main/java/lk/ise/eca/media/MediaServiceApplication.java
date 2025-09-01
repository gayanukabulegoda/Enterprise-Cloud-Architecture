package lk.ise.eca.media;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class MediaServiceApplication implements WebMvcConfigurer {

    @Value("${media.storage.dir}")
    private String mediaStorageDir;

    public static void main(String[] args) {
        SpringApplication.run(MediaServiceApplication.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:" + mediaStorageDir + "/");
    }
}
