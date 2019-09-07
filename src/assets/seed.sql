CREATE TABLE IF NOT EXISTS account(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT, 
    secret TEXT,
    orgname TEXT,
    issuer TEXT,
    mode TEXT,
    hardlock TEXT,
    round TEXT
    );
    -- INSERT or IGNORE INTO account(id,username, secret,orgname,issuer,mode,hardlock,round ) VALUES (1, 'big','00cce87d8f79a77cdbf3ec60bbeb38e7bb40e61942be8e8bc32f979b5142a88c','ISAN','ISAN','num6','lock','30');
