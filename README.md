# drone-rocket

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d67ae762fd2b4e488103e9824bbe1320)](https://www.codacy.com/app/milewski/drone-rocket)
[![](https://img.shields.io/docker/automated/rmilewski/drone-rocket.svg)](https://hub.docker.com/r/rmilewski/drone-rocket)
[![](https://images.microbadger.com/badges/image/rmilewski/drone-rocket.svg)](https://hub.docker.com/r/rmilewski/drone-rocket)
[![](https://img.shields.io/github/license/milewski/drone-rocket.svg)](LICENSE)

Basic `.drone.yml` example

```yaml
kind: pipeline
name: default

steps:
- name: notification
  image: rmilewski/drone-rocket:latest
  when:
      status: [ success, failure ]
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
```

## Available options

See [source/interfaces/OptionsInterface.d.ts](source/interfaces/OptionsInterface.d.ts)

## Environment Reference

[https://docs.drone.io/reference/environ/](https://docs.drone.io/reference/environ/)

## License 

[MIT](LICENSE) © [Rafael Milewski](https://github.com/milewski)
