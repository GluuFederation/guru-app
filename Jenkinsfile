def dockerImage = "gluufederation/guru-jenkins"

def nodeName
def slackChannel = "#si_repo-psammead"
def stageName = "Unknown"
def gitCommitAuthor = "Unknown"
def gitCommitMessage = "Unknown"

def getCommitInfo = {
  gitCommitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${GIT_COMMIT}").trim()
  gitCommitMessage = sh(returnStdout: true, script: "git log -1 --pretty=%B").trim()
}

def notifyRocket(color, buildStatus, gitCommitAuthor, stageName, gitCommitMessage) {
  // call the global slackSend method in Jenkins
  rocketSend channel: "guru_git", message: "*${buildStatus}* on ${GIT_BRANCH} [build ${BUILD_DISPLAY_NAME}] \n*Author:* ${gitCommitAuthor} \n*Stage:* ${stageName} \n*Commit Hash* \n${GIT_COMMIT} \n*Commit Message* \n${gitCommitMessage}"
}


pipeline {
  agent any
  options {
    timeout(time: 60, unit: 'MINUTES')
    timestamps ()
  }
  environment {
    CI = true
  }
  stages {
    stage('Build and Test images') {
      when {
        expression { env.BRANCH_NAME != 'master' }
      }
      agent {
        docker {
          image "${dockerImage}"
          label nodeName
          args '-u root'
        }
      }

      steps {
        sh './devops/local-build.sh'
      }
      post {
        always {
          script {
            stageName = env.STAGE_NAME
          }
        }
      }
    }

    stage('Build and Deploy images') {
      when {
        expression { env.BRANCH_NAME == 'master' }
      }
      agent {
        docker {
          image "${dockerImage}"
          label nodeName
          args '-u root'
        }
      }

      steps {
        sh './devops/remote-deploy.sh'
      }
      post {
        always {
          script {
            stageName = env.STAGE_NAME
          }
        }
      }
    }
  }
  post {
    aborted {
      script {
        getCommitInfo()
        notifyRocket('danger', 'Aborted', gitCommitAuthor, stageName, gitCommitMessage)
      }
    }
    failure {
      script {
        getCommitInfo()
        notifyRocket('danger', 'Failed', gitCommitAuthor, stageName, gitCommitMessage)
      }
    }
    success {
      script {
        getCommitInfo()
        notifyRocket('good', 'Success', gitCommitAuthor, stageName, gitCommitMessage)
      }
    }
    unstable {
      script {
        getCommitInfo()
        notifyRocket('danger', 'Unstable', gitCommitAuthor, stageName, gitCommitMessage)
      }
    }
  }
}
