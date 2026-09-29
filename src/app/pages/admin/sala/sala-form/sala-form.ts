import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaService } from '../../../../core/services/sala.service';
import { Sala } from '../../../../core/models/sala';

@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private salaService = inject(SalaService);

  formSala = this.fb.group({
    id:,
    nome: [''],
    preco: [0]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.salaService.buscarPorId(Number(id)).subscribe({
        next: (sala) => {
          this.formSala.patchValue(sala);
        },
        error: (err) => console.error('Erro ao buscar detalhes da sala:', err)
      });
    }
  }

  save(): void {
    if (this.formSala.invalid) return;

    const salaDados = this.formSala.getRawValue() as Sala;

    this.salaService.salvar(salaDados).subscribe({
      next: () => {
        this.router.navigate(['/salas']);
      },
      error: (err) => console.error('Erro ao salvar sala:', err)
    });
  }
}
