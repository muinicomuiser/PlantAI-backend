import { Entity } from "typeorm";

@Entity({ name: 'plantas_habuto_crecimiento' })
export class HabitoCrecimiento {
  id: number;
  crecimiento: string;
}
