import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from 'src/app/commons/interfaces/player.interface';
import { debounceTime, Observable } from 'rxjs';
import { PlayersService } from 'src/app/core/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // NgIf, NgFor, AsyncPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private authService = inject(AuthService);
  players$!: Observable<Player[]>;
  _playerService = inject(PlayersService);
  _router = inject(Router);
  searcher = new FormControl('');

  ngOnInit(): void {
    this.players$ = this._playerService.getPlayers();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      // this._playerService.
      if (search) {
        console.log(search);
        this.players$ = this._playerService.getPlayers(search);
      } else {
        this.players$ = this._playerService.getPlayers();
      }
    });
  }

  editPlayer(player: Player) {
    this._router.navigateByUrl('users/edit', { state: { player } });
  }
  deletePlayer(player: Player) {
    if (confirm(`Seguro de borrar a ${player.name}`)) {
      this._playerService.deletePlayer(player.id);
    }
  }
  async logOut(): Promise<void> {
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }
}
