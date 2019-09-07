import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject ,Observable} from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
export interface Acc {
  id: number,
  username: string,
  secret: string,
  orgname:string,
  issuer:string,
  mode:string,
  harklock:string,
  round:string
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

   accounts= new BehaviorSubject([]);
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) { 
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'account.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          // this.loadDevelopers();
          // this.loadProducts();
          this.loadAccounts();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getAccs(): Observable<Acc[]> {
    return this.accounts.asObservable();
  }
  loadAccounts() {
    return this.database.executeSql('SELECT * FROM account', []).then(data => {
      let accounts: Acc[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          accounts.push({ 
            id: data.rows.item(i).id,
            username: data.rows.item(i).username, 
            secret: data.rows.item(i).secret,
            orgname: data.rows.item(i).orgname,
            issuer: data.rows.item(i).issuer,
            mode: data.rows.item(i).mode,
            harklock: data.rows.item(i).harklock,
            round: data.rows.item(i).round,
           });
        }
      }
      this.accounts.next(accounts);
    });
  }
  addAccount(username,secret,orgname,issuer,mode,harklock,round){
    let data = [username,secret,orgname,issuer,mode,harklock,round];
    return this.database.executeSql('INSERT INTO account (username, secret,orgname,issuer,mode,hardlock,round) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadAccounts();
    });
  }
  getAccount(id){
    return this.database.executeSql('SELECT * FROM account WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
            username: data.rows.item(0).username, 
            secret: data.rows.item(0).secret,
            orgname: data.rows.item(0).orgname,
            issuer: data.rows.item(0).issuer,
            mode: data.rows.item(0).mode,
            harklock: data.rows.item(0).harklock,
            round: data.rows.item(0).round,
      }
    });
  }
  deleteAccount(id){
    return this.database.executeSql('DELETE FROM account WHERE id = ?', [id]).then(_ => {
      this.loadAccounts();
    });
  }


}
