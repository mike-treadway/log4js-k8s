module.exports = new DefaultProvider();
    
function DefaultProvider(){
}

DefaultProvider.prototype.format =  function(logEvent, layout){
    return {
        category: logEvent.categoryName,
        pid: logEvent.pid,
        level_id: logEvent.level.level,
        level: logEvent.level.levelStr,
        timestamp: logEvent.startTime.getTime() + (logEvent.startTime.getTimezoneOffset() * 60000),
        message: layout(logEvent),
        ...Object.keys(logEvent.context).length > 0 && { context: logEvent.context }
    }
}
