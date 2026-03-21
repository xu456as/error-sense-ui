plugins {
    id("node-frontend")
    id("frontend-jib")
}

group = "org.openprojectx.ai"
version = "0.1.0-SNAPSHOT"

allprojects {
    repositories {
        mavenCentral()
    }
}
