pipeline {
    agent any
    
    // Ini hanya informasi pipeline
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        // Nama job akan otomatis diambil dari nama item di Jenkins (git-pat)
    }
    
    stages {
        stage('Checkout') {
            steps {
                // credentialsId mengacu pada ID credential yang dibuat di Jenkins
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/afdhali/belajar-jenkins-dasar.git',
                        credentialsId: 'github-pat' // Ini mengacu ke credential, bukan nama job
                    ]]
                ])
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("express-hello:${env.BUILD_ID}")
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    try {
                        sh 'docker stop express-hello || true'
                        sh 'docker rm express-hello || true'
                    } catch (error) {
                        echo 'Container tidak ada, lanjut membuat baru'
                    }
                    
                    sh "docker run -d --name express-hello -p 5000:5000 express-hello:${env.BUILD_ID}"
                }
            }
        }
    }
}