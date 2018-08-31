console.log("[App] Başlatılıyor...");
const Discord = require('discord.js');

const ownerID = '331846231514939392' //Kendi ID ni yapıştır
const bot = new Discord.Client({fetchAllMembers:true});
bot.on('ready', () => {
    console.log('[Client] Bağlandı! Kullanıcı adı: ' + bot.user.username + " - " + bot.user.id);
});

const prefix = '+'
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
		        .setImage("http://cevremuhendisiyim.com/wp-content/uploads/tehlike-kuru-kafa.png")
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

if(input === "-bitir" && isPlaying == true) {
    isPlaying = false
    round = 0
		let bozgun1 = new Discord.RichEmbed()
	      .setTitle("Pes Ettin!")
		        .setImage("http://cevremuhendisiyim.com/wp-content/uploads/tehlike-kuru-kafa.png")
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
