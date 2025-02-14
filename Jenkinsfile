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
        
        stage('Setup Network') {
            steps {
                script {
                    try {
                        sh 'docker network create jenkins || true'
                    } catch (error) {
                        echo 'Network might already exist, continuing...'
                    }
                }
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
                    
                    sh "docker run -d --name express-hello --network jenkins -p 5000:5000 express-hello:${env.BUILD_ID}"
                }
            }
        }
    }
}