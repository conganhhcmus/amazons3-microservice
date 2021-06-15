create database doan_cnpm;
use doan_cnpm;

create table bucket
(
	id int not null auto_increment,
    name nvarchar(100) not null,
    region nvarchar(100) not null,
    user_id int not null,
    last_update timestamp,
    primary key (id)
);

create table object
(
    id int not null auto_increment,
    name nvarchar(100) not null,
    bucket_id int not null,
    type varchar(50) not null,
    path nvarchar(255) null,
    parent int null,
    size varchar(50) null,
    last_update timestamp,
    primary key (id)
);

alter table object add constraint fk_object_bucket foreign key (bucket_id) references bucket(id)