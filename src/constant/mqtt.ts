export const MQTT_Broker = {
    HOST: 'driver.cloudmqtt.com',
    PORT: 38643,
    CLIENT_NAME: "clientID-" + parseInt((Math.random() * 100).toString()),
    USER_NAME: "cqbfckol",
    PASSWORD: "mpSkyZ4D1N6f",
}

export const MQTT_TOPIC_SUB = {
    RELAY_1: "ESPs/RL1",
    RELAY_2: "ESPs/RL2",
    RELAY_3: "ESPs/RL3",
    RELAY_4: "ESPs/RL4",
    RELAY_DATA: "ESPs/RL/",
    ENV: "ESPs/environment/",
    NOTIFICATION: 'APIs/notification/'
}

export const MQTT_TOPIC_PUB = {
    RELAY_1: "ESPr/RL1",
    RELAY_2: "ESPr/RL2",
    RELAY_3: "ESPr/RL3",
    RELAY_4: "ESPr/RL4",
}
