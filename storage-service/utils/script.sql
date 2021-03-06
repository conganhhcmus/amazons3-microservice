create table bucket
(
	id serial,
	name varchar(100) not null,
    region varchar(100) not null,
    user_id varchar(255) not null,
    last_update timestamp,
    primary key (id)
)

create table object
(
    id serial,
    name varchar(100) not null,
    bucket_id int not null,
    type varchar(50) not null,
    path varchar(255) null,
    parent int null,
    size varchar(50) null,
    last_update timestamp,
    primary key (id)
);

alter table object add constraint fk_object_bucket foreign key (bucket_id) references bucket(id)
alter table object add file_type varchar(30) null;
alter table object add user_id varchar(255) null;
ALTER TABLE object ALTER COLUMN last_update SET DEFAULT current_timestamp;

alter table bucket add username varchar(255) null;
alter table bucket add root_id varchar(255) null;
ALTER TABLE bucket ALTER COLUMN last_update SET DEFAULT current_timestamp;
alter table bucket add created_at timestamp DEFAULT current_timestamp;