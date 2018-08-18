console.log("[App] Başlatılıyor...");
const Discord = require('discord.js');

const ownerID = '331846231514939392' //Kendi ID ni yapıştır
const bot = new Discord.Client({fetchAllMembers:true});
bot.on('ready', () => {
    console.log('[Client] Bağlandı! Kullanıcı adı: ' + bot.user.username + " - " + bot.user.id);
});

const prefix = '-'
var isPlaying = false
var round = 0
var stats = {}
bot.on('message', (msg) => {
  if(stats.HP < 1 && isPlaying == true) {
    isPlaying = false
    round = 0
	
	let tebriks = new Discord.RichEmbed()
	      .setTitle("Tebrikler, düşmanı yok ettin!")
		        .setImage("http://pluspng.com/img-png/kupa-png-alt-n-kupa-png-resmi-golden-cup-png-485.png")
    msg.channel.send(tebriks)

  }
  if(stats.plrHP < 1 && isPlaying == true) {
    isPlaying = false
    round = 0
		let bozgun = new Discord.RichEmbed()
	      .setTitle("Maalesef öldün!")
		        .setImage("data:image/jpeg;base64,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")

    msg.channel.send(bozgun)
  }
              var input = msg.content.toLowerCase();
if(input === prefix + "başla" && isPlaying == false) {
  stats.enemies = ['Titan', 'Yeşil Sümük', 'Şeytan', 'Büyücü', 'Mavi Sümük', 'Kırmızı Sümük', 'Goblin', 'İskelet']
    stats.enemy = stats.enemies[Math.floor(Math.random() * stats.enemies.length)]
  if(stats.enemy == 'Yeşil Sümük') {
    stats.attackMul = 1.0
      stats.HP = 30
  }
  if(stats.enemy == 'Mavi Sümük') {
    stats.attackMul = 1.25
      stats.HP = 35
  }
  if(stats.enemy == 'Kırmızı Sümük') {
    stats.attackMul = 1.50
      stats.HP = 40
  }
  if(stats.enemy == 'Titan') {
    stats.attackMul = 0.5
      stats.HP = 65
  }
  if(stats.enemy == 'Şeytan') {
    stats.attackMul = 2.5
      stats.HP = 35
  }
  if(stats.enemy == 'Büyücü') {
    stats.attackMul = 3.0
      stats.HP = 25
  }
  if(stats.enemy == 'Goblin') {
    stats.attackMul = 1.25
      stats.HP = 45
  }
  if(stats.enemy == 'İskelet') {
    stats.attackMul = 0.75
      stats.HP = 50
  }
  stats.cooldown = 1
  stats.cooldown = 1
  round = round + 1
  isPlaying = true

  stats.plrHP = 40
  stats.maxHP = stats.plrHP
  stats.Mana = 50
stats.fireUsed = 0
  stats.onFire = false
  
  let inf1 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
  msg.channel.send(inf1)
}

if(input === "bitir" && isPlaying == true) {
    isPlaying = false
    round = 0
		let bozgun1 = new Discord.RichEmbed()
	      .setTitle("Pes Ettin!")
		        .setImage("data:image/jpeg;base64,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")

    msg.channel.send(bozgun1)
}
if(input === "saldır" && isPlaying == true) {

  if(stats.attackMul == 0.5) {
      attackDmg = Math.floor(Math.random() * 16) + 3 / 2
  }
  if(stats.attackMul == 0.75) {
    attackDmg = Math.floor(Math.random() * 16) + 3 / 3

  }
  if(stats.attackMul != 0.5) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  if(stats.attackMul != 0.75) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  stats.attackChance = ['1', '2', '3', '4', '1', '1', '1', '1', '1', '1']
  stats.missChance = stats.attackChance[Math.floor(Math.random() * stats.attackChance.length)]
  if(stats.missChance == 10) {
	  	const ıska1 = new Discord.RichEmbed()
      .setDescription('Iskaladın ve sıran geçti!.')
    msg.channel.send(ıska1)
    stats.plrHP = stats.plrHP - attackDmg
	
	const l1 = new Discord.RichEmbed()
      .setDescription('Arrgh! ' + stats.enemy + ' Sana vurdu! Verdiği hasar: ' + attackDmg)
      msg.channel.send(l1)
      round = round + 1
          stats.cooldown = 1
                    stats.cooldown2 = 1
      if(stats.onFire == true && isPlaying == true) {
		  	  	const yan1 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan1)
        stats.toTakeAway = 5 * stats.fireUsed
    stats.HP = stats.HP - stats.toTakeAway

		  	  	const yan2 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan1)
      }

	    let inf2 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
      msg.channel.send(inf2)
  }
  if(stats.missChance != 10) {
    stats.plrHP = stats.plrHP - attackDmg
	const l2 = new Discord.RichEmbed()
      .setDescription('Arrgh! ' + stats.enemy + ' Sana vurdu! Verdiği hasar: ' + attackDmg)
      msg.channel.send(l2)
      round = round + 1
          stats.cooldown = 1
		  		  	  	const has1 = new Discord.RichEmbed()
      .setDescription('Düşmana ' + attackDmg + ' Hasar verdin!')
          msg.channel.send(has1)
          stats.HP = stats.HP - attackDmg
          stats.cooldown2 = 1
      if(stats.onFire == true && isPlaying == true) {
        var attackDmg = Math.floor(Math.random() * 15) + 4

        stats.toTakeAway = 5 * stats.fireUsed
    stats.HP = stats.HP - stats.toTakeAway

		  	  	const yan3 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan3)
      }
	  
	    let inf3 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
      msg.channel.send(inf3)
  }

}


if(input === "can" && isPlaying == true && stats.Mana > 24) {
  var heal = Math.floor(Math.random() * 13) + 6
  stats.test = heal + stats.plrHP
  stats.plrHP = stats.plrHP + heal
  stats.Mana = stats.Mana - 25
  
  		  		  	  	const cann1 = new Discord.RichEmbed()
      .setDescription(heal + ' can doldurdun ve 25 mana harcadın.')
  msg.channel.send(cann1)
  
    		  		  	  	const salmadı1 = new Discord.RichEmbed()
      .setDescription('Düşman saldıramadı!')
  msg.channel.send(salmadı1)
  round = round + 1
      stats.cooldown = 1
                stats.cooldown2 = 1
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway

		  	  	const yan4 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan4)
  }
    let inf4 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
  msg.channel.send(inf4)
}

if(input === "can" && isPlaying == true && stats.Mana < 25) {
	
	    		  		  	  	const manay1 = new Discord.RichEmbed()
      .setDescription('Yeterli Manan yok!')
msg.channel.send(manay1)
}
if(input === "ateştopu" && isPlaying == true && stats.Mana > 5) {

  if(stats.attackMul == 0.5) {
      attackDmg = Math.floor(Math.random() * 16) + 3 / 2
  }
  if(stats.attackMul == 0.75) {
    attackDmg = Math.floor(Math.random() * 16) + 3 / 3

  }
  if(stats.attackMul != 0.5) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  if(stats.attackMul != 0.75) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  stats.attackChance = ['1', '1', '1', '1', '5', '1', '1', '1', '1', '1']
  stats.missChance = stats.attackChance[Math.floor(Math.random() * stats.attackChance.length)]
  if(stats.missChance == 5) {
	  	const ıska2 = new Discord.RichEmbed()
      .setDescription('Iskaladın ve sıran geçti!.')
    msg.channel.send(ıska2)
  stats.plrHP = stats.plrHP - attackDmg
	const l3 = new Discord.RichEmbed()
      .setDescription('Arrgh! ' + stats.enemy + ' Sana vurdu! Verdiği hasar: ' + attackDmg)
      msg.channel.send(l3)
  round = round + 1
    stats.cooldown = 1
              stats.cooldown2 = 1
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway
}

  let inf5 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
  msg.channel.send(inf5)



} else {
  var attackDmg = Math.floor(Math.random() * 6) + 2
stats.fireUsed = stats.fireUsed + 1
  stats.Mana = stats.Mana - 3
      stats.cooldown = 1
          stats.cooldown2 = 1
		  	    		  		  	  	const ateşle1 = new Discord.RichEmbed()
      .setDescription('Düşmana Ateş Topu attın ve 5 mana harcadın!')
  msg.channel.send(ateşle1)
  stats.onFire = true
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway

		  	  	const yan5 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan5)
  }
  stats.plrHP = stats.plrHP - attackDmg
	const l4 = new Discord.RichEmbed()
      .setDescription('Arrgh! ' + stats.enemy + ' Sana vurdu! Verdiği hasar: ' + attackDmg)
      msg.channel.send(l4)
  round = round + 1
  
    let inf6 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
  msg.channel.send(inf6)
}
}


if(input === "ateştopu" && isPlaying == true && stats.Mana < 5) {
	    		  		  	  	const manay2 = new Discord.RichEmbed()
      .setDescription('Yeterli Manan yok!')
msg.channel.send(manay2)
}


if(input === "kalkan" && isPlaying == true && stats.Mana > 5 && stats.cooldown == 1) {

		  	    		  		  	  	const kalkanned1 = new Discord.RichEmbed()
      .setDescription('Sıradaki saldırıyı blokladın!')
  msg.channel.send(kalkanned1)
  attackDmg = 0.5
  stats.plrHP = stats.plrHP - attackDmg
  
		  	    		  		  	  	const kalkanned2 = new Discord.RichEmbed()
      .setDescription("Kalkan " + stats.enemy + "'dan gelen hasarın çoğunu engelledi ancak " + attackDmg + " can kaybettin!")

  
  msg.channel.send(kalkanned2)
  round = round + 1
  stats.cooldown = 1
  stats.cooldown2 = 1
  if(stats.onFire == true && isPlaying == true) {
                stats.toTakeAway = 5 * stats.fireUsed
        stats.HP = stats.HP - stats.toTakeAway

		  	  	const yan6 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan6)


  }
  
    let inf7 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
  msg.channel.send(inf7)



}
if(input === 'kalkan' && stats.cooldown == 0) {
			  	    		  		  	  	const kalkanned4 = new Discord.RichEmbed()
      .setDescription("Kalkan şuan tamir ediliyor!")

  
  msg.channel.send(kalkanned4)

}

if(input === "em" && isPlaying == true && stats.Mana > 9 && stats.cooldown2 == 1) {
  var heal = Math.floor(Math.random() * 5) + 2
  stats.test = heal + stats.plrHP
  stats.HP = stats.HP - heal
  stats.plrHP = stats.plrHP + heal
  stats.Mana = stats.Mana - 10
      		  		  	  	const emdin1 = new Discord.RichEmbed()
      .setDescription('Düşmanın ' + heal + ' canını emdin ve 10 mana harcadın!')
  msg.channel.send(emdin1)
    		  		  	  	const salmadı2 = new Discord.RichEmbed()
      .setDescription('Düşman saldıramadı!')
  msg.channel.send(salmadı2)
  round = round + 1
    stats.cooldown2 = 0
      stats.cooldown = 1
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway

		  	  	const yan7 = new Discord.RichEmbed()
      .setDescription('Düşman şuanda yandığı için ' + stats.toTakeAway + ' can kaybetti!')
            msg.channel.send(yan7)
  }
  
    let inf8 = new Discord.RichEmbed()
  .setTitle("Düşman: " + stats.enemy)
  .addField("Düşmanın canı : ", stats.HP)
  .addField("Canın: ", stats.plrHP)
  .addField("Manan: ", stats.Mana)
  .addField("Yapabileceğin saldırılar: ", "saldır, ateştopu, can, kalkan, em")
  
  msg.channel.send(inf8)
}
if(input === 'em' && stats.cooldown2 == 0) {
	
	      		  		  	  	const emdin2 = new Discord.RichEmbed()
      .setDescription("Emme özelliği şuan da beklemede!")
  msg.channel.send(emdin2)
}

if(input === "em" && isPlaying == true && stats.Mana < 10) {
	    		  		  	  	const manay4 = new Discord.RichEmbed()
      .setDescription('Yeterli Manan yok!')
msg.channel.send(manay4)
}

if(msg.content.startsWith(prefix + "eval ")) {
if (msg.author.id != ownerID) return;
try {
var code = msg.content.substring(6);
var evaled = eval(code);
msg.channel.sendCode("xl", (evaled));
} catch(err) {
    msg.channel.send(
    "`HATA`" + "\n" + err
    );
  }
}

});



bot.login(process.env.BOT_TOKEN).catch((err) => console.log(`[Client] Hata: ${err.message}`)) //Buraya tokenini yaz
process.on("unhandledRejection", err => {
  console.error("Hata: \n" + err.stack);
});
