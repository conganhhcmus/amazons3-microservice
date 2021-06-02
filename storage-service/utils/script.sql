create database doan_cnpm;
use doan_cnpm;

create table region
(
	id int not null auto_increment,
    name nvarchar(100) not null,
    code varchar(100) not null,
    last_update timestamp,
    primary key (id)
);

create table bucket
(
	id int not null auto_increment,
    name nvarchar(100) not null,
    region_id int not null,
    user_id int not null,
    last_update timestamp,
    primary key (id)
);

alter table bucket add constraint fk_bucket_region foreign key (region_id) references region(id)

insert into region(name, code, last_update) values(N'Việt Nam', 'vn', current_timestamp())