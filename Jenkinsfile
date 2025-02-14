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
                    // Stop dan remove container lama jika ada
                    sh '''
                        docker stop express-hello || true
                        docker rm express-hello || true
                    '''
                    
                    // Jalankan container baru di network yang benar (6737f875143e)
                    sh "docker run -d --name express-hello --network 6737f875143e133472d0dfcb537311aaf373cba691e58ff89400dbab7b7f2394 -p 5000:5000 express-hello:${env.BUILD_ID}"
                }
            }
        }
    }
}