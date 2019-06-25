import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Post from './Post';

@Entity({ name: 'sessions' })
export default class Session {
  @PrimaryColumn({ primary: true, generated: false })
  public id: string;
  @Column()
  public name: string;
  @OneToMany(() => Post, post => post.session, {
    eager: true,
  })
  public posts: Post[] | undefined;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
