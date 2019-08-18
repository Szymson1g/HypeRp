const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");


bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  
  


  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Nie widze komend ;v.");
    return;
  }
  console.log(``);
  console.log(`========== Loading... ==========`);
  console.log(``);
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    
    console.log(`Komenda ${f} została poprawnie uruchomiona, wruuuum!`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", async () => {


  console.log("Rozrubka123 pozdrawia ! <3")
  
    

  setInterval(function() {
      
      
      let statuses = [
       `Konfiguracja v0.8 | BETA`,
       `$help | PRZYDATNE KOMENDY`,
       `Założyciel bota: Rozrubka123`
      ]
      
      let status = statuses[Math.floor(Math.random()* statuses.length)];
      bot.user.setActivity(status, {type: "Playing"})
      bot.user.setStatus('online');

  }, 5000)
    
  console.log(``);
  console.log(`========== Servers List ==========`);
  console.log(``);
  bot.guilds.forEach((guild) => {
  console.log(" » " + guild.name)
});
});










function isValidTimeSpan(string) {
  let validChars = [];
  validChars.push("s");
  validChars.push("m");
  validChars.push("h");
  validChars.push("d");
  validChars.push("w");
  string = string.replaceAll(" ", "");
  Object.entries(validChars).forEach((s) =>{
    string = string.replace(s[1], "");
  })
  for (let i = 0; i <= 9; i++) {
    string = string.replaceAll(i + "", "");
  }
  return string.length == 0;
}
function getLongFromTimeSpan(string) {
  let validChars = [];
  validChars.push({name:"s", value:1})
  validChars.push({name:"m", value:60})
  validChars.push({name:"h", value:3600})
  validChars.push({name:"d", value:86400})
  validChars.push({name:"w", value:86400 * 7})
  let finalBonus = 0;
  Object.entries(validChars).forEach((s) =>{
    let id = string.indexOf(s[1].name);
    if (id != -1) {
      if (id != 0) {
        let firstDigit = -1;
        for (let i = id - 1; i >= 0; i--) {
          let foundNumber = false;
          for (let num = 0; num <= 9; num++) {
            if ((string.charAt(i) + "") === (num + "")) {
              foundNumber = true;
              break;
            }
          }
          if (foundNumber) {
            firstDigit = i;
          } else {
            break;
          }
        }
        if (firstDigit != -1) {
          finalBonus += parseInt(string.substring(firstDigit, id)) * s[1].value;
        }
      }
    }
  })

  return finalBonus * 1000;
}

function formatTime(seconds){
  let validChars = [];
  validChars.push({name:"s", value:1})
  validChars.push({name:"m", value:60})
  validChars.push({name:"h", value:3600})
  validChars.push({name:"d", value:86400})
  validChars.push({name:"w", value:86400 * 7})
  let weeks = 0;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let finalTime = (seconds === 0) ? "0 sekund" : ""
  seconds = seconds/1000.0
  while (seconds >= 86400 * 7){
    seconds -= 86400 * 7;
    weeks++;
  }
  while (seconds >= 86400 ){
    seconds -= 86400;
    days ++;
  }
  while (seconds >= 3600 ){
    seconds -= 3600;
    hours ++;
  }
  while (seconds >= 60 ){
    seconds -= 60;
    minutes ++;
  }
  if (weeks >= 1){
    return "ponad tydzien"
  }
  if (days >= 1){
    finalTime += " "+days+ (days = 1 ? " dzien" : " dni")
  }
  if (hours >= 1){
    if (hours == 1){
      finalTime +=" "+ hours+ " godzina"
    }else if ("2||3||4||22||23".split("||").includes(hours+"") ){
      finalTime += " "+hours+ " godziny"
    }else {
      finalTime += " "+hours+ " godzin"
    }
  }
  if (minutes >= 1){
    if (minutes == 1){
      finalTime += " "+minutes+ " minuta"
    }else if ("2||3||4||22||23||24||32||33||34||42||43||44||52||53||54".split("||").includes(minutes+"")){
      finalTime += " "+minutes+ " minuty"
    }else {
      finalTime += " "+minutes+ " minut"
    }
  }
  seconds = Math.floor(seconds)
  if (seconds >= 1){
    if (seconds == 1){
      finalTime += " "+seconds+ " sekunda"
    }else if ("2||3||4||22||23||24||32||33||34||42||43||44||52||53||54".split("||").includes(seconds+"")){
      finalTime += " "+seconds+ " sekundy"
    }else {
      finalTime += " "+seconds+ " sekund"
    }

  }
  return finalTime.substr(1)
}
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase(); 
    let args = messageArray.slice(1);
  
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
      if (cmd.startsWith(prefix)){
        cmd = cmd.substr(prefix.length)
      
    
    
    }//end prefix przed tym robisz wiado
});




bot.login(botconfig.token);
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
function simpleDateFormat(pattern, locale) {
  this.locale = (locale && (locale == 'es_US' || locale == 'en_CA' || locale == 'fr_CA' || 
                 locale == 'en_GB' || locale == 'en_AU')) ? locale : 'en_US';
  
  /*
   * applyPattern is a public method which updates the pattern. It accepts one argument:
   *
   * updatedPattern (optional):
   * The updated pattern to apply.
   */
  this.applyPattern = function(updatedPattern) {
    this.pattern = updatedPattern || ((this.locale == 'en_CA' || this.locale == 'fr_CA' || 
                                       this.locale == 'en_GB' || this.locale == 'en_AU') ? 
                                      'd/M/yy' : 'M/d/yy');
  };
  this.applyPattern(pattern);
  
  /*
   * format is a public method which returns the provided Date object as a String formatted based on the 
   * defined pattern. The method accepts one argument:
   *
   * unformattedDate (optional):
   * The date to be formatted. This can be either a Date object, or an ISO-8601 string. If no date is 
   * provided, a new Date object is created at the time the method is called.
   */
  this.format = function(unformattedDate) {
    unformattedDate = unformattedDate || new Date();
    if(!(unformattedDate instanceof Date)) {
      var unformattedDateParts = unformattedDate.split('T')[0].split('-'), 
      unformattedDateTimeParts = (unformattedDate.split('T').length > 1) ? unformattedDate.split('T')[1]
                                                                                          .split('.')[0]
                                                                                          .split('Z')[0]
                                                                                          .split('-')[0]
                                                                                          .split(':') 
                                                                         : ['00', '00', '00'];
      unformattedDate = new Date(unformattedDateParts[0], (unformattedDateParts[1] - 1), 
                                 unformattedDateParts[2], unformattedDateTimeParts[0], 
                                 unformattedDateTimeParts[1], unformattedDateTimeParts[2]);
    }
    
    /*
     * oneDigitNumber is a private method which removes leading zeroes from the provided number. The 
     * method accepts one argument:
     *
     * num (required):
     * The number to be formatted.
     */
    var oneDigitNumber = function(num) {
      num = '' + num;
      return (num.indexOf('0') == 0 && num != '0') ? num.substring(1) : num;
    }, 
    
    /*
     * twoDigitNumber is a private method which ensures the provided number has at least two digits. The 
     * method accepts one argument:
     *
     * num (required):
     * The number to be formatted.
     */
    twoDigitNumber = function(num) {
      num = Number(num);
      return isNaN(num) ? '00' : (((num < 10) ? '0' : '') + num);
    }, 
    
    /*
     * The dateParts object contains each piece of the provided Date needed to construct the formatted 
     * date/time String. Each of the Numbers are converted to a String, with the exception of E.
     */
    dateParts = {
      month: twoDigitNumber(unformattedDate.getMonth() + 1), 
      date: twoDigitNumber(unformattedDate.getDate()), 
      year: twoDigitNumber(unformattedDate.getFullYear()), 
      day: unformattedDate.getDay(), 
      hour24: unformattedDate.getHours(), 
      hour12: unformattedDate.getHours(), 
      minutes: twoDigitNumber(unformattedDate.getMinutes()), 
      ampm: 'AM'
    };
    if(dateParts.hour24 > 11) {
      dateParts.ampm = 'PM';
    }
    dateParts.hour24 = twoDigitNumber(dateParts.hour24);
    if(dateParts.hour12 == 0) {
      dateParts.hour12 = 12;
    }
    if(dateParts.hour12 > 12) {
      dateParts.hour12 = dateParts.hour12 - 12;
    }
    dateParts.hour12 = twoDigitNumber(dateParts.hour12);
    
    var formattedDate, 
    
    /*
     * patternReplace is a private method which interprets a piece of the provided pattern.
     *
     * patternPart (required):
     * The piece of the pattern to be interpretted.
     */
    patternReplace = function(patternPart) {
      var patternPartFormatted = patternPart.replace(/yy+(?=y)/g, 'yy')
                                            .replace(/MMM+(?=M)/g, 'MMM')
                                            .replace(/d+(?=d)/g, 'd')
                                            .replace(/EEE+(?=E)/g, 'EEE')
                                            .replace(/a+(?=a)/g, '')
                                            .replace(/k+(?=k)/g, 'k')
                                            .replace(/h+(?=h)/g, 'h')
                                            .replace(/m+(?=m)/g, 'm'), 
      
      formattedPart = patternPartFormatted.replace(/yyy/g, dateParts.year)
                                          .replace(/yy/g, dateParts.year.substring(2))
                                          .replace(/y/g, dateParts.year)
                                          .replace(/dd/g, dateParts.date)
                                          .replace(/d/g, oneDigitNumber(dateParts.date)), 
      
      /*
       * adjustTimePattern is a private method which adjusts the hour of the provided date up or down.
       *
       * timeParts (required):
       * The pieces of the pattern split on a plus or minus sign after the hour pattern letters.
       *
       * timePatternPart (required):
       * The type of pattern letter. One of "h", "hh", "k", or "kk".
       *
       * operator (required):
       * The mathematical operator, either "+" or "-".
       */
      adjustTimePattern = function(timeParts, timePatternPart, operator) {
        for(var i = 1; i < timeParts.length; i++) {
          if(!isNaN(timeParts[i].substring(0, 1))) {
            var timePartOperand = timeParts[i].substring(0, 2);
            timeParts[i] = timeParts[i].substring(2);
            if(isNaN(timePartOperand.substring(1))) {
              timeParts[i] = timePartOperand.substring(1) + timeParts[i];
              timePartOperand = timePartOperand.substring(0, 1);
            }
            timePartOperand = Number(timePartOperand);
            if(timePartOperand > 23) {
              timePartOperand = 23;
            }
            //by yoh
            var timePartResult = (operator == '+') ? timePartOperand : (0 - timePartOperand);
            if(timePatternPart == 'kk' || timePatternPart == 'k') {
              timePartResult = (Number(dateParts.hour24) + timePartResult);
              if(timePartResult > 24) {
                timePartResult = timePartResult - 24;
              }
              else if(timePartResult < 0) {
                timePartResult = timePartResult + 24;
              }
            }
            else {
              timePartResult = (Number(dateParts.hour12) + timePartResult);
              if(timePartResult > 24) {
                timePartResult = timePartResult - 24;
              }
              else if(timePartResult < 0) {
                timePartResult = timePartResult + 24;
              }
              if(timePartResult > 12) {
                timePartResult = timePartResult - 12;
              }
            }
            timePartResult = '' + timePartResult;
            if(timePatternPart == 'kk' || timePatternPart == 'hh') {
              timePartResult = twoDigitNumber(timePartResult);
            }
            if((timePatternPart == 'h' && timePartResult == 0) || (timePatternPart == 'hh' && 
               timePartResult == '00')) {
              timePartResult = '12';
            }
            timeParts[i] = timePartResult + timeParts[i];
          }
        }
        
        return timeParts.join('');
      };
      
      if(formattedPart.indexOf('k+') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('kk+'), 'kk', '+');
        formattedPart = adjustTimePattern(formattedPart.split('k+'), 'k', '+');
      }
      if(formattedPart.indexOf('k-') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('kk-'), 'kk', '-');
        formattedPart = adjustTimePattern(formattedPart.split('k-'), 'k', '-');
      }
      
      formattedPart = formattedPart.replace(/kk/g, dateParts.hour24)
                                   .replace(/k/g, oneDigitNumber(dateParts.hour24));
      
      if(formattedPart.indexOf('h+') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('hh+'), 'hh', '+');
        formattedPart = adjustTimePattern(formattedPart.split('h+'), 'h', '+');
      }
      if(formattedPart.indexOf('h-') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('hh-'), 'hh', '-');
        formattedPart = adjustTimePattern(formattedPart.split('h-'), 'h', '-');
      }
      
      formattedPart = formattedPart.replace(/hh/g, ((dateParts.hour12 < 12 && dateParts.hour12.indexOf && 
                                                     dateParts.hour12.indexOf('0') != 0) ? ('0' + 
                                                     dateParts.hour12) : 
                                                    dateParts.hour12))
                                   .replace(/h/g, oneDigitNumber(dateParts.hour12));
      
      formattedPart = formattedPart.replace(/mm/g, dateParts.minutes)
                                   .replace(/m/g, oneDigitNumber(dateParts.minutes));
      
      formattedPart = formattedPart.replace(/a/g, 'A');
      
      var formattedMonthNames = ['January', 
                                 'February', 
                                 'march', 
                                 'april', 
                                 'may', 
                                 'June', 
                                 'July', 
                                 'august', 
                                 'September', 
                                 'October', 
                                 'November', 
                                 'December'];
      if(locale == 'es_US') {
        formattedMonthNames = ['enero', 
                               'febrero', 
                               'marzo', 
                               'abril', 
                               'mayo', 
                               'junio', 
                               'julio', 
                               'agosto', 
                               'septiembre', 
                               'octubre', 
                               'noviembre', 
                               'diciembre'];
      }
      if(locale == 'fr_CA') {
        formattedMonthNames = ['janvier', 
                               'f&' + '#233;vrier', 
                               'mars', 
                               'avril', 
                               'mai', 
                               'juin', 
                               'juillet', 
                               'ao&' + '#251;t', 
                               'septembre', 
                               'octobre', 
                               'novembre', 
                               'd&' + '#233;cembre'];
      }
      var formattedMonthShorthand3 = formattedMonthNames[Number(dateParts.month) - 1].substring(0, 3);
      if(locale == 'fr_CA') {
        if(formattedMonthShorthand3 == 'f&' + '#') {
          formattedMonthShorthand3 = 'f&' + '#233;v';
        }
        else if(formattedMonthShorthand3 == 'ao&') {
          formattedMonthShorthand3 = 'ao&' + '#251;';
        }
        else if(formattedMonthShorthand3 == 'd&' + '#') {
          formattedMonthShorthand3 = 'd&' + '#233;c';
        }
      }
      formattedPart = formattedPart.replace(/MMMM/g, formattedMonthNames[Number(dateParts.month) - 1])
                                   .replace(/MMM/g, formattedMonthShorthand3)
                                   .replace(/MM/g, dateParts.month)
                                   .replace(/M/g, oneDigitNumber(dateParts.month));
      
      var formattedDayNames = ['Sunday', 
                               'Monday', 
                               'Tuesday', 
                               'Wednesday', 
                               'Thursday', 
                               'Friday', 
                               'Saturday'];
      if(locale == 'es_US') {
        formattedDayNames = ['domingo', 
                             'lunes', 
                             'martes', 
                             'mi&' + 'eacute;rcoles', 
                             'jueves', 
                             'viernes', 
                             's&' + 'aacute;bado'];
      }
      if(locale == 'fr_CA') {
        formattedDayNames = ['dimanche', 
                             'lundi', 
                             'mardi', 
                             'mercredi', 
                             'jeudi', 
                             'vendredi', 
                             'samedi'];
      }
      var formattedDayShorthand3 = formattedDayNames[dateParts.day].substring(0, 3);
      if(locale == 'es_US') {
        if(formattedDayShorthand3 == 'mi&') {
          formattedDayShorthand3 = 'mi&' + 'eacute;';
        }
        else if(formattedDayShorthand3 == 's&' + 'a') {
          formattedDayShorthand3 = 's&' + 'aacute;b';
        }
      }
      formattedPart = formattedPart.replace(/EEEE/g, formattedDayNames[dateParts.day])
                                   .replace(/EEE/g, formattedDayShorthand3)
                                   .replace(/EE/g, formattedDayShorthand3)
                                   .replace(/E/g, formattedDayShorthand3);
      
      formattedPart = formattedPart.replace(/A/g, dateParts.ampm)
                                   .replace(/apr/g, 'Apr')
                                   .replace(/aug/g, 'Aug');
      
      if(locale != 'es_US' && locale != 'fr_CA') {
        formattedPart = formattedPart.replace(/mar/g, 'Mar')
                                     .replace(/may/g, 'May');
      }
      
      return formattedPart;
    };
    
    /*
     * If the pattern does not contain any quoted strings, parse it as-is.
     */
    if(this.pattern.indexOf('\'') == -1) {
      formattedDate = patternReplace(this.pattern);
    }
    
    /*
     * If the pattern contains one or more quoted strings, split it into pieces and parse only the 
     * non-quoted pattern letters.
     */
    else {
      var formatPatternParts = this.pattern.replace(/\'+(?=\')/g, '\'\'').split('\'\'');
      if(formatPatternParts.length == 1) {
        formatPatternParts = this.pattern.split('\'');
        for(var i = 0; i < formatPatternParts.length; i++) {
          if(i % 2 == 0) {
            formatPatternParts[i] = patternReplace(formatPatternParts[i]);
          }
        }
        return formatPatternParts.join('');
      }
      else {
        for(var i = 0; i < formatPatternParts.length; i++) {
          var formatPatternParts2 = formatPatternParts[i].split('\'');
          for(var j = 0; j < formatPatternParts2.length; j++) {
            if(j % 2 == 0) {
              formatPatternParts2[j] = patternReplace(formatPatternParts2[j]);
            }
          }
          formatPatternParts[i] = formatPatternParts2.join('');
        }
        return formatPatternParts.join('\'');

      }
    }
    
    return formattedDate;
  };
}




let leveluplist = {};
let levelupRanks = {};
levelupRanks[1] = "Level: Brąz"
levelupRanks[10] = "Level: Węgiel"
levelupRanks[20] = "Level: Kwarc"
levelupRanks[30] = "Level: Srebro"
levelupRanks[40] = "Level: Złoto"
levelupRanks[50] = "Level: Diament"
levelupRanks[60] = "Level: Szmaragd"
leveluplist[1] = 100;
for (let i = 2 ; i <= 60; i++){leveluplist[i] = leveluplist[i-1]*1.4}

xpCD = []
function canGetExp(id){
  let user = xpCD.find(user => user.id == id)
  if (!user){
    let nextUse = new Date()
    nextUse.setTime(nextUse.getTime()+1000*3)
    xpCD.push({id:id, nextUse:nextUse})
    return true
  }else{
    if (user.nextUse.getTime() < new Date().getTime()){
      let nextUse = new Date()
      nextUse.setTime(nextUse.getTime()+1000*3)
      user.nextUse = nextUse
      return true
    }
  }
}
