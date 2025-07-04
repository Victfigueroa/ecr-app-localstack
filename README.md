# Publicación y Gestión de Imágenes Docker con ECR y CI/CD

**GRUPO 5:**

- Juan Villaman  
- Cristóbal de Jesus  
- Víctor Figueroa  

**Módulo 5: Arquitectura y escalabilidad**  
**Clase 5: Registro de contenedores**  
**Ejercicio Guiado: Publicación y Gestión de Imágenes Docker**

---

## Descripción del Ejercicio

Este proyecto consistió en la construcción, publicación y despliegue de una imagen Docker utilizando GitHub Actions, Docker Hub y LocalStack para simular ECR (Elastic Container Registry) de AWS. Automatizamos el pipeline CI/CD desde el push en GitHub hasta el despliegue en un clúster local con Kind. Se configuró la autenticación con Docker Hub, la creación dinámica de un repositorio en ECR simulado y la implementación final de la aplicación usando Kubernetes. 

---

## Preguntas Finales

**¿Por qué usar un registro privado como ECR en lugar de Docker Hub?**  
ECR permite mayor control, acceso privado y seguridad al almacenar imágenes. Es ideal para entornos empresariales, ya que se integra con IAM, permite escaneo automático y se conecta fácilmente con otros servicios de AWS como EKS.

**¿Qué ventajas ofrece automatizar el push al repositorio?**  
Garantiza consistencia, reduce errores manuales y acelera despliegues. Cada push en GitHub construye la imagen, la publica en DockerHub y actualiza el entorno simulado con LocalStack, replicando un entorno productivo con control total.

**¿Cómo podrías gestionar versiones y rollback en imágenes?**  
Etiquetando imágenes por commit (`imagen:sha`) o versión (`imagen:v1.2.0`). Esto permite seleccionar versiones anteriores si ocurre un fallo. Por ejemplo, usar `kubectl rollout undo` tras identificar errores en una imagen reciente desplegada.

**¿Qué controles de seguridad podrías implementar en ECR?**  
Se podría implementar escaneo automático en push, limitar acceso con IAM, usar repositorios privados, habilitar cifrado y revisar logs con CloudTrail. En LocalStack simulamos ECR, pero en producción esto protege la cadena de suministro de software.

---

## Diagrama del Flujo CI/CD con ECR

![Diagrama de Flujo CI/CD]

![CI-CD con ECR](https://github.com/user-attachments/assets/8805926e-05aa-45d9-9eec-f6bab00600f7)

El flujo inicia cuando se hace un push al branch principal en GitHub. Esto activa un pipeline que primero construye y publica la imagen Docker en DockerHub, asegurando que la última versión esté disponible. Luego, un segundo trabajo levanta LocalStack para simular AWS ECR localmente, crea un repositorio ECR y construye la imagen con la etiqueta correspondiente para subirla a este repositorio simulado. Después, se crea un clúster Kubernetes local con Kind, se carga la imagen en los nodos y se despliega la aplicación usando kubectl. Finalmente, se verifica que el despliegue y los pods estén activos y funcionando correctamente.
