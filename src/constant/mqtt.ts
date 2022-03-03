export const MQTT_Broker = {
    HOST: 'driver.cloudmqtt.com',
    PORT: 38643,
    CLIENT_NAME: "clientID-" + parseInt((Math.random() * 100).toString()),
    USER_NAME: "cqbfckol",
    PASSWORD: "mpSkyZ4D1N6f",
}

export const MQTT_TOPIC_SUB = {
    RELAY_0: "ESPs/RL0/",
    RELAY_1: "ESPs/RL1/",
    RELAY_2: "ESPs/RL2/",
    RELAY_3: "ESPs/RL3/",
    RELAY_4: "ESPs/RL4/",
    RELAY_DATA: "ESPs/RL/",
    ENV: "ESPs/environment/",
    NOTIFICATION: 'APIs/notification/'
}

export const MQTT_TOPIC_PUB = {
    RELAY_0: "ESPn/RL0",
    RELAY_1: "ESPn/RL1",
    RELAY_2: "ESPn/RL2",
    RELAY_3: "ESPn/RL3",
    RELAY_4: "ESPn/RL4",
}
