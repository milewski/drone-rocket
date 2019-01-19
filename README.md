# drone-rocket

basic `.drone.yml` example

```yaml
kind: pipeline
name: default

steps:
- name: notification
  image: rmilewski/drone-rocket:latest
  settings:
    webhook:
      from_secret: rocket_chat_webhook
    channel: dev
    username: DroneCI
    color: 
      - value: green
        when:
          DRONE_BUILD_STATUS: success
      - value: red
        when:
          DRONE_BUILD_STATUS: failure          
    message:
      - value: "Build: ${DRONE_BUILD_NUMBER} succeeded. Good job."
        when:
          DRONE_BUILD_STATUS: success
      - value: "Build: ${DRONE_BUILD_NUMBER} failed. Fix me please."      
    text: ${DRONE_COMMIT_MESSAGE}
    fields:
      - title: Author
        value: ${DRONE_COMMIT_AUTHOR}
      - title: Demo
        value: This field will only be visible if the current branch: ${DRONE_COMMIT_BRANCH} is master or production
        when:
          DRONE_COMMIT_BRANCH:
            - master
            - production
    when:
      status: [ success, failure ]
```
