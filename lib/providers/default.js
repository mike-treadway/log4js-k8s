module.exports = new DefaultProvider();
    
function DefaultProvider(){
}

DefaultProvider.prototype.format =  function(logEvent, layout){
    return {
        cataegory: logEvent.categoryName,
        pid: logEvent.pid,
        level_id: logEvent.level.level,
        level: logEvent.level.levelStr,
        timestamp: logEvent.startTime.getTime() + (logEvent.startTime.getTimezoneOffset() * 60000),
        message: layout(logEvent)
    }
}