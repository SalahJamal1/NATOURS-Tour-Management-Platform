pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    credentialsId: '466dcc78-0b3c-4b51-9c0b-28a9d809353c',
                    url: 'https://github.com/SalahJamal1/NATOURS-Tour-Management-Platform'
            }
        }

        stage('Backend Build') {
            steps {
                dir('server') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('client') {
                    script {
                        nodejs('node') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('OWASP Dependency Check') {
                steps { 
                    withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_API_KEY')]) {
                        dependencyCheck additionalArguments: '--nvdApiKey ' + NVD_API_KEY + ' --scan ./ --format XML --format HTML',
                            odcInstallation: 'DP' 
                        
                    } 
                    
                }
            
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=Natours \
                        -Dsonar.projectName=Natours \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/**
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                            withCredentials([
                                usernamePassword(credentialsId: '8a0ea94d-bd48-4c46-a69f-6fc0a11e67d1', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                            ])
                            {
                            sh '''
                                docker login -u $DOCKER_USER -p $DOCKER_PASS
                                docker build --no-cache -t salah529/natours-frontend:latest ./client
                                docker build --no-cache -t salah529/natours-backend:latest ./server
                                docker push salah529/natours-frontend:latest
                                docker push salah529/natours-backend:latest
                            '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('k8s'){
                    script {
                        sh '''
                        kubectl apply -f .
                        '''
                     }
                    
                }
                
            }
        }
    }
}
