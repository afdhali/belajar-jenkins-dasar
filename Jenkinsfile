pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/afdhali/belajar-jenkins-dasar.git',
                        credentialsId: 'github-pat'
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
                    
                    // Gunakan network jenkins yang sudah ada
                    sh "docker run -d --name express-hello --network jenkins -p 5000:5000 express-hello:${env.BUILD_ID}"
                }
            }
        }
    }
}