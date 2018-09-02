
// This is the function that generates an appender function
function K8sAppender(layout, provider) {
    // This is the appender function itself
    return (loggingEvent) => {
        process.stdout.write(`${JSON.stringify(provider.format(loggingEvent, layout))}\n`);
    };
}

function configure(config, layouts) {
    // using message pass through so we can have the message portion formatted
    let layout = layouts.messagePassThroughLayout;

    // check if there is another layout specified
    if (config.layout) {
        // load the layout
        layout = layouts.layout(config.layout.type, config.layout);
    }

    // Load the provider
    config.provider = config.provider || "default";
    var provider = undefined;
    try{
        provider = require(`./providers/${config.provider}`);
    }catch(e){
        throw new Error(`The specified provider [${config.provider}] is not valid.`);
    }

    //create a new appender instance
    return K8sAppender(layout, provider);
}


//export the only function needed
module.exports.configure = configure;