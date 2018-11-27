import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Shipment} from '../../models/shipment.interface';
import {ShipmentService} from '../../services/shipment/shipment.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  shipmentForm: FormGroup;
  shipments: Shipment[];
  shipmentsTable: any;
  shipmentsTableColumns: string[] = ['position', 'name', 'description', 'price', 'type', 'isActive'];
  edit = false;
  shipmentId = '';

  constructor(private fb: FormBuilder,
              private shipmentService: ShipmentService) {
  }

  ngOnInit() {
    this.getShipments();
    this.createForm();
  }

  createForm() {
    this.shipmentForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'nameEng': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'descriptionEng': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required, Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),
      'type': new FormControl(''),
      'isActive': new FormControl(true)
    });
  }

  buildTable(data: Shipment[]) {
    this.shipmentsTable = new MatTableDataSource<Shipment>(data);
  }

  addShipment() {
    const data = this.shipmentForm.value;
    this.shipmentService.addShipment(data).subscribe(resp => {
      this.shipmentForm.reset();
      this.getShipments();
    });
  }

  getShipments() {
    this.shipmentService.getShipments().subscribe(resp => {
      this.shipments = resp;
      this.buildTable(this.shipments);
    });
  }

  sendFormByEnter() {
    if (this.shipmentForm.invalid) {
      return;
    }
    this.addShipment();
  }
  setEdit(shipment: Shipment) {
    this.edit = true;
    this.shipmentForm.controls['name'].setValue(shipment.name);
    this.shipmentForm.controls['nameEng'].setValue(shipment.nameEng);
    this.shipmentForm.controls['description'].setValue(shipment.description);
    this.shipmentForm.controls['descriptionEng'].setValue(shipment.descriptionEng);
    this.shipmentForm.controls['price'].setValue(shipment.price);
    this.shipmentForm.controls['isActive'].setValue(shipment.isActive);
    this.shipmentForm.controls['type'].setValue(shipment.type);
    this.shipmentId = shipment.id;
  }

  editShipment() {
    const data = this.shipmentForm.value;
    console.log(data);
    this.shipmentService.updateShipment(this.shipmentId, data).subscribe(resp => {
      this.getShipments();
      this.edit = false;
      this.shipmentForm.reset();
    });
  }

  cancelEdit() {
    this.edit = false;
    this.shipmentForm.reset();
  }
}
