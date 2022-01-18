JENKINS_USER=$1
JENKINS_TOKEN=$2
JENKINS_AUTHEN=${JENKINS_USER}:${JENKINS_TOKEN}
JOB_URL=$3
JOB_STATUS_URL=${JOB_URL}/lastBuild/api/json

GREP_RETURN_CODE=0

while [ $GREP_RETURN_CODE -eq 0 ]
do
    sleep 10
    curl --silent --user $JENKINS_AUTHEN $JOB_STATUS_URL | grep result\":null || if [ "$?" == "1" ]; then
        curl --silent --user $JENKINS_AUTHEN $JOB_STATUS_URL
        echo -e "\nRun jenkins job finished\n"
    	exit 0
    fi

    GREP_RETURN_CODE=$?
done
