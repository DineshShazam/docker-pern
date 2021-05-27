const keys = require('./keys');
const redis = require('redis');

// creating the instance with redis
const redisClient = redis.createClient({ 
  host: keys.redisHost,
  port: keys.redisPort,
  // if the connection is lost will retry within 1 second
  retry_strategy: () => 1000,
});

// duplicating the instance 
const sub = redisClient.duplicate();

// fibinacci calculation 
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// whenever redis receives a 'message' this callback function will be activated 
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

// subscribing to the insert event in redis 
sub.subscribe('insert');
