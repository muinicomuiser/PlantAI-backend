import { Entity } from "typeorm";

@Entity({ name: 'plantas_habito_crecimiento' })
export class HabitoCrecimiento {
  id: number;
  crecimiento: string;
}
