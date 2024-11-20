-- Enable RLS
alter table if exists contacts enable row level security;
alter table if exists engagements enable row level security;

-- Create contacts table
create table if not exists public.contacts (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    email text,
    phone text,
    relationship text not null check (relationship in ('close_friend', 'friend', 'work', 'acquaintance', 'family')),
    birthday date,
    location text,
    job text,
    notes text,
    children text[],
    image_url text,
    engagement_score integer default 0,
    last_engagement timestamp with time zone,
    last_engagement_type text check (last_engagement_type in ('in-person', 'video-call', 'online-message', 'text')),
    hobbies text[],
    favorite_movies text[],
    favorite_tv_shows text[],
    favorite_music_artists text[],
    favorite_foods text[],
    favorite_drinks text[],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create engagements table
create table if not exists public.engagements (
    id uuid default gen_random_uuid() primary key,
    contact_id uuid references public.contacts(id) on delete cascade not null,
    type text not null check (type in ('in-person', 'video-call', 'online-message', 'text')),
    notes text,
    points integer not null,
    date timestamp with time zone default now()
);

-- Create RLS policies for contacts
create policy "Users can view their own contacts"
    on contacts for select
    using (auth.uid() = user_id);

create policy "Users can insert their own contacts"
    on contacts for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own contacts"
    on contacts for update
    using (auth.uid() = user_id);

create policy "Users can delete their own contacts"
    on contacts for delete
    using (auth.uid() = user_id);

-- Create RLS policies for engagements
create policy "Users can view engagements for their contacts"
    on engagements for select
    using (
        exists (
            select 1 from contacts
            where contacts.id = engagements.contact_id
            and contacts.user_id = auth.uid()
        )
    );

create policy "Users can insert engagements for their contacts"
    on engagements for insert
    with check (
        exists (
            select 1 from contacts
            where contacts.id = engagements.contact_id
            and contacts.user_id = auth.uid()
        )
    );

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for contacts
create trigger update_contacts_updated_at
    before update on contacts
    for each row
    execute function update_updated_at_column();