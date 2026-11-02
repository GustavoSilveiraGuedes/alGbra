package br.com.algbra;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class AlgbraApplication {

    public static void main(String[] args) {
        // Obtém o diretório atual de execução
        File userDir = new File(System.getProperty("user.dir"));

        // Se a execução iniciou dentro da pasta 'backend', sobe um nível para encontrar o .env na raiz
        File envFile = new File(userDir, ".env");
        String dotenvPath = userDir.getAbsolutePath();

        if (!envFile.exists() && userDir.getParentFile() != null) {
            dotenvPath = userDir.getParentFile().getAbsolutePath();
        }

        Dotenv dotenv = Dotenv.configure()
                .directory(dotenvPath)
                .ignoreIfMissing()
                .load();

        // Injeta as variáveis do .env no System Properties antes do Spring Boot inicializar
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });

        SpringApplication.run(AlgbraApplication.class, args);
    }
}