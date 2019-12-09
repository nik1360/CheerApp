drop database if exists cheerApp;
create database cheerApp;
use cheerApp;

-- TABLES CREATION

create table user (
		username varchar(20) primary key,
        password varchar(30) not null,
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
        flag_electroinc boolean default false
);
create table venue (
	code varchar(6) primary key,
    name varchar(40) not null,
    city varchar(15) not null,
    address varchar(30) not null
);

create table event (
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
    foreign key (venue_code) references venue(code)
    
);

create table organizer (
	username varchar(20) primary key,
	password varchar(30) not null,
	email varchar(40) not null unique, 
    phone varchar(10) not null,
	name varchar (20),
	surname varchar(20),
	date_of_birth date not null, -- format: 'yyyy-mm-dd'
	nationality varchar (15)
);

-- RELATIONS BETWEEN TABLES

create table user_event(		-- users join events
	username varchar(20),
    event_code varchar(20),
    payment_status bool default false,
    paymnent_import float,
    
    primary key(username, event_code),
    foreign key (username) references user(username),
    foreign key (event_code) references event(code)
);

create table organizer_event(		-- organizerss create events
	username varchar(20),
    event_code varchar(20),
    advertised boolean default false,
    
    primary key(username, event_code),
    foreign key (username) references organizer(username),
    foreign key (event_code) references event(code)
);

-- POPULATION

insert into user values('nik','password','mail1@mail.com','nikolas','sw_eng','1996-11-19', 'pavia', 'italian', true, true ,false ,false, false, false);
insert into user values('evi','password','mail2@mail.com','evi','sw_eng','1996-11-19', 'pavia', 'greek', false, false ,false ,false, false, true);
insert into user values('julie','password','mail3@mail.com','julie','sw_eng','1996-11-19', 'pavia', 'belgium', false, true ,false ,false, true, false);
insert into user values('jesus','password','mail4@mail.com','jesus','sw_eng','1996-11-19', 'pavia', 'spanish', false, false ,true ,false, false, false);
insert into user values('pierre','password','mail5@mail.com','pierre','sw_eng','1996-11-19', 'pavia', 'french', false, true ,false ,false, true, false);

insert into venue values('T5J78L', 'Alcatraz', 'Milan', 'Via Piave 68');
insert into venue values('H8J78L', 'Hiroshima Monamour', 'Turin', 'Vial Mille 99');

insert into event values ('AFGTV6', 'Serate ignoranti', 'description', 10, 'T5J78L', '2019-12-23','00:00:00','00:00:00', true, true ,false ,false, false, true);