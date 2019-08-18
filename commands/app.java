package me.rozrubka.hyperp;

import discord4j.core.DiscordClient;
import discord4j.core.DiscordClientBuilder;
import discord4j.core.event.domain.lifecycle.ReadyEvent;
import discord4j.core.event.domain.message.MessageCreateEvent;
import discord4j.core.object.entity.Message;

public class App 
{
    public static void main( String[] args )
    {
    	final DiscordClient client = new DiscordClientBuilder("NTk4ODA2MzA5Njg0NjQxODAz.XScCdw.OgG-_obSMXJnqSDFMAu_90xLmTo").build();

    	client.getEventDispatcher().on(ReadyEvent.class)
    	        .subscribe(ready -> System.out.println("Logged in as " + ready.getSelf().getUsername()));

    	client.getEventDispatcher().on(MessageCreateEvent.class)
    	        .map(MessageCreateEvent::getMessage)
    	        .filter(msg -> msg.getContent().map("!yt"::equals).orElse(false))
    	        .flatMap(Message::getChannel)
    	        .flatMap(channel -> channel.createMessage("Kanał Właściciela Bota: https://www.youtube.com/channel/UCoFzouw_98pSKoLMyd3dYTg"))
    	        .subscribe();
    	
    	client.getEventDispatcher().on(MessageCreateEvent.class)
                .map(MessageCreateEvent::getMessage)
                .filter(msg -> msg.getContent().map("!wlasciciele"::equals).orElse(false))
                .flatMap(Message::getChannel)
                .flatMap(channel -> channel.createMessage("```Właściciele Serwera HYPERP:``` **szymson**#9378, **Rozrubka123**#8716, **Swelly**#8730"))
                .subscribe();
    	
    	client.getEventDispatcher().on(MessageCreateEvent.class)
                .map(MessageCreateEvent::getMessage)
                .filter(msg -> msg.getContent().map("!ip"::equals).orElse(false))
                .flatMap(Message::getChannel)
                .flatMap(channel -> channel.createMessage("```Ip naszego Serwera HYPERP:``` **51.38.132.241 lub wpisać HYPERP**"))
                .subscribe();  	  
    	
    	client.getEventDispatcher().on(MessageCreateEvent.class)
                .map(MessageCreateEvent::getMessage)
                .filter(msg -> msg.getContent().map("!sluzby"::equals).orElse(false))
                .flatMap(Message::getChannel)
                .flatMap(channel -> channel.createMessage("```Służby na naszym serwerze:``` **LSPD, EMS, LSC**"))
                .subscribe();
    	
    	client.getEventDispatcher().on(MessageCreateEvent.class)
                .map(MessageCreateEvent::getMessage)
                .filter(msg -> msg.getContent().map("!prace"::equals).orElse(false))
                .flatMap(Message::getChannel)
                .flatMap(channel -> channel.createMessage("```Prace na Naszym Serwerze:``` **Złomiarz, Piekarz, Sadownik, Winiarz, Kurier, Taxi, Reporter**"))
                .subscribe();
    	
    	client.getEventDispatcher().on(MessageCreateEvent.class)
                .map(MessageCreateEvent::getMessage)
                .filter(msg -> msg.getContent().map("!komendy"::equals).orElse(false))
                .flatMap(Message::getChannel)
                .flatMap(channel -> channel.createMessage("```Wszystkie Dostępne komendy:``` **!ip, !prace, !wlasciciele, !yt, !sluzby**"))
                .subscribe();

    	client.login().block(); 
    }
}
