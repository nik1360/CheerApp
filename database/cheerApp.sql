drop database if exists cheerApp;
create database cheerApp;
use cheerApp;

create table users (
		username varchar(20) primary key,
        password varchar(100) not null,
        email varchar(40) not null unique, 
        name varchar (20),
        surname varchar(20),
        date_of_birth date not null, -- format: 'yyyy-mm-dd'
        city varchar (15),
        nationality varchar (15),
        
        -- list of the user tastes
        flag_rock boolean default false,
        flag_hiphop boolean default false,
        flag_reggaeton boolean default false,
        flag_reggae boolean default false,
        flag_techno boolean default false,
        flag_electronic boolean default false
);

create table organizers (
	username varchar(20) primary key,
	password varchar(100) not null,
	email varchar(40) not null unique, 
    phone varchar(10) not null,
	name varchar (20),
	surname varchar(20),
	date_of_birth date not null-- format: 'yyyy-mm-dd'
);

create table venues (
	code varchar(6) primary key,
    name varchar(40) not null,
    city varchar(15) not null,
    address varchar(30) not null
);

create table events (
	code varchar(6) primary key,
    name varchar(40) not null,
    description varchar (200) not null,
    entrance_price float not null,
    venue_code varchar(20) not null,
    date date not null, -- format: 'yyyy-mm-dd'
    start_time time, -- format: 'hh:mm:ss'
    end_time time,
    
    -- list of music genres played at the event
	flag_rock boolean default false,
	flag_hiphop boolean default false,
	flag_reggaeton boolean default false,
	flag_reggae boolean default false,
	flag_techno boolean default false,
	flag_electronic boolean default false,
    foreign key (venue_code) references venues(code)
    
);

create table users_events(		-- users join events
	username varchar(20),
    event_code varchar(20),
    
    primary key(username, event_code),
    foreign key (username) references users(username),
    foreign key (event_code) references events(code)
);

create table organizers_events(		-- organizers create events
	username varchar(20),
    event_code varchar(20),
    advertised boolean default false,
    
    primary key(username, event_code),
    foreign key (username) references organizers(username),
    foreign key (event_code) references events(code)
);

create table friends(
	username1 varchar(20),
    username2 varchar(20),
    
    foreign key (username1) references users(username),
	foreign key (username2) references users(username),
    primary key(username1, username2)
);

