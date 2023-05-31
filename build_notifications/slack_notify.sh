SLACK_URL=$1
BUILD_STATUS=$2
NOTIFICATION_TYPE=$3
SUCCESS_BUILD=0

if [ $BUILD_STATUS -le $SUCCESS_BUILD ]
then

    curl -X POST -H 'Content-type:application/json' --data "{\"attachments\":[{\"color\":\"#1c3d80\",\"blocks\":[{\"type\":\"header\",\"text\":{\"type\":\"plain_text\",\"text\":\"$NOTIFICATION_TYPE New Wrapper Features Released\"}},{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Date: $RELEASE_DATE\n Pipeline: $PIPELINE_ID\"}}]}]}" $SLACK_URL

else

    curl -X POST -H 'Content-type:application/json' --data "{\"attachments\":[{\"color\":\"#801c2b\",\"blocks\":[{\"type\":\"header\",\"text\":{\"type\":\"plain_text\",\"text\":\"$NOTIFICATION_TYPE Ops!!! Wrapper Build Failed \"}},{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Date: $RELEASE_DATE\n Pipeline: $PIPELINE_ID\"}}]}]}" $SLACK_URL

fi

echo "Notification Sended !!!!!"