import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RowNode } from 'ag-grid-community';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { CacheService } from 'src/app/shared/cache-service';
import { ContextModel, GenericModel } from 'src/app/shared/models/general/generic-model';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';
import { ButtonRendererComponent } from './renderer/renderer.component';

@Component({
  selector: 'app-ctl-table',
  templateUrl: './ctl-table.component.html'
})
export class CtlTableComponent implements OnInit {

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @Input() menusContext: ContextModel[] = [];
  @Input() contextMenu = false;
  showContext = false;
  //  private pinnedBottomRowData;
  pinnedBottomData;

  columnsWithAggregation: string[] = [];

  gridApi;
  gridColumnApi;

  @Input() pagination = true;
  @Input() totals = false;

  @Input() floatingFilter = true;

  @Input() rowClassRules = {
    'rag-red': function (params) {
      if (!params.data) return false;
      return params.data.Cancelado;
    }
  };

  frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
  }

  defaultColDef;
  @Input() columnDefs: any[] = [];


  @Input() rowData: any[] = [];
  rowFilterData: any[] = [];

  @Input() promise: Promise<any>;

  @Input() rowStyle: any;

  @Output() valueChanged = new EventEmitter<any>();
  @Output() keyPress = new EventEmitter<any>();

  @Output() apiEvent = new EventEmitter<any>();

  @Output() messageEvent = new EventEmitter<any>();
  @Output() menuEvent = new EventEmitter<any>();


  @Input() SizeColumn = true;
  localeText = {
    // for filter panel
    page: 'Página',
    more: 'Más',
    to: 'A',
    of: 'De',
    next: 'Siguiente',
    last: 'Última',
    first: 'Primera',
    previous: 'Previa',
    loadingOoo: 'Cargando...',

    // for set filter
    selectAll: 'Seleccionar todo',
    searchOoo: 'Buscar...',
    blanks: 'Blanco',

    // for number filter and text filter
    filterOoo: 'Filtrar...',
    equals: 'Igual',
    notEqual: 'No es igual',

    // for the date filter
    dateFormatOoo: 'dd-mm-Yyyy',

    // for number filter
    lessThan: 'Es menor que',
    greaterThan: 'Es mas grande',
    lessThanOrEqual: 'Es igual o menor',
    greaterThanOrEqual: 'Es igual o mayor',
    inRange: 'En rango',
    inRangeStart: 'Empieza',
    inRangeEnd: 'Termina',

    // for text filter
    contains: 'Contiene',
    notContains: 'No contiene',
    startsWith: 'Empieza con',
    endsWith: 'Termina con',

    // filter conditions
    andCondition: 'Y',
    orCondition: 'O',

    // filter buttons
    applyFilter: 'Aplicar',
    resetFilter: 'Resetear',
    clearFilter: 'Limpiar',

    // the header of the default group column
    group: 'Agrupar',

    // tool panel
    columns: 'Columnas',
    filters: 'Filtros',
    rowGroupColumns: 'Grupo de columnas',
    rowGroupColumnsEmptyMessage: 'la drag cols to group',
    valueColumns: 'Valores de columnas',
    pivotMode: 'laPivot-Mode',
    groups: 'Grupos',
    values: 'Valores',
    pivots: 'laPivots',
    valueColumnsEmptyMessage: 'la drag cols to aggregate',
    pivotColumnsEmptyMessage: 'la drag here to pivot',
    toolPanelButton: 'la tool panel',

    // other
    noRowsToShow: 'Sin registros',
    enabled: 'Habilitar',

    // enterprise menu
    pinColumn: 'laPin Column',
    valueAggregation: 'laValue Agg',
    autosizeThiscolumn: 'laAutosize Diz',
    autosizeAllColumns: 'laAutsoie em All',
    groupBy: 'laGroup by',
    ungroupBy: 'laUnGroup by',
    resetColumns: 'laReset Those Cols',
    expandAll: 'laOpen-em-up',
    collapseAll: 'laClose-em-up',
    toolPanel: 'laTool Panel',
    export: 'laExporto',
    csvExport: 'laCSV Exportp',
    excelExport: 'laExcel Exporto (.xlsx)',
    excelXmlExport: 'laExcel Exporto (.xml)',

    // enterprise menu (charts)
    pivotChartAndPivotMode: 'laPivot Chart & Pivot Mode',
    pivotChart: 'laPivot Chart',
    chartRange: 'laChart Range',

    columnChart: 'laColumn',
    groupedColumn: 'laGrouped',
    stackedColumn: 'laStacked',
    normalizedColumn: 'la100% Stacked',

    barChart: 'laBar',
    groupedBar: 'laGrouped',
    stackedBar: 'laStacked',
    normalizedBar: 'la100% Stacked',

    pieChart: 'laPie',
    pie: 'laPie',
    doughnut: 'laDoughnut',

    line: 'laLine',

    xyChart: 'laX Y (Scatter)',
    scatter: 'laScatter',
    bubble: 'laBubble',

    areaChart: 'laArea',
    area: 'laArea',
    stackedArea: 'laStacked',
    normalizedArea: 'la100% Stacked',

    // enterprise menu pinning
    pinLeft: 'laPin <<',
    pinRight: 'laPin >>',
    noPin: 'laDontPin <>',

    // enterprise menu aggregation and status bar
    sum: 'laSum',
    min: 'laMin',
    max: 'laMax',
    none: 'laNone',
    count: 'laCount',
    average: 'laAverage',
    filteredRows: 'laFiltered',
    selectedRows: 'laSelected',
    totalRows: 'laTotal Rows',
    totalAndFilteredRows: 'laRows',

    // standard menu
    copy: 'laCopy',
    copyWithHeaders: 'laCopy With Headers',
    ctrlC: 'laCtrl n C',
    paste: 'laPaste',
    ctrlV: 'laCtrl n V',

    // charts
    pivotChartTitle: 'laPivot Chart',
    rangeChartTitle: 'laRange Chart',
    settings: 'laSettings',
    data: 'laData',
    format: 'laFormat',
    categories: 'laCategories',
    defaultCategory: '(laNone)',
    series: 'laSeries',
    xyValues: 'laX Y Values',
    paired: 'laPaired Mode',
    axis: 'laAxis',
    color: 'laColor',
    thickness: 'laThickness',
    xType: 'laX Type',
    automatic: 'laAutomatic',
    category: 'laCategory',
    number: 'laNumber',
    time: 'laTime',
    xRotation: 'laX Rotation',
    yRotation: 'laY Rotation',
    ticks: 'laTicks',
    width: 'laWidth',
    length: 'laLength',
    padding: 'laPadding',
    chart: 'laChart',
    title: 'laTitle',
    background: 'laBackground',
    font: 'laFont',
    top: 'laTop',
    right: 'laRight',
    bottom: 'laBottom',
    left: 'laLeft',
    labels: 'laLabels',
    size: 'laSize',
    minSize: 'laMinimum Size',
    maxSize: 'laMaximum Size',
    legend: 'laLegend',
    position: 'laPosition',
    markerSize: 'laMarker Size',
    markerStroke: 'laMarker Stroke',
    markerPadding: 'laMarker Padding',
    itemPaddingX: 'laItem Padding X',
    itemPaddingY: 'laItem Padding Y',
    strokeWidth: 'laStroke Width',
    offset: 'laOffset',
    offsets: 'laOffsets',
    tooltips: 'laTooltips',
    callout: 'laCallout',
    markers: 'laMarkers',
    shadow: 'laShadow',
    blur: 'laBlur',
    xOffset: 'laX Offset',
    yOffset: 'laY Offset',
    lineWidth: 'laLine Width',
    normal: 'laNormal',
    bold: 'laBold',
    italic: 'laItalic',
    boldItalic: 'laBold Italic',
    predefined: 'laPredefined',
    fillOpacity: 'laFill Opacity',
    strokeOpacity: 'laLine Opacity',
    columnGroup: 'laColumn',
    barGroup: 'laBar',
    pieGroup: 'laPie',
    lineGroup: 'laLine',
    scatterGroup: 'laScatter',
    areaGroup: 'laArea',
    groupedColumnTooltip: 'laGrouped',
    stackedColumnTooltip: 'laStacked',
    normalizedColumnTooltip: 'la100% Stacked',
    groupedBarTooltip: 'laGrouped',
    stackedBarTooltip: 'laStacked',
    normalizedBarTooltip: 'la100% Stacked',
    pieTooltip: 'laPie',
    doughnutTooltip: 'laDoughnut',
    lineTooltip: 'laLine',
    groupedAreaTooltip: 'laGrouped',
    stackedAreaTooltip: 'laStacked',
    normalizedAreaTooltip: 'la100% Stacked',
    scatterTooltip: 'laScatter',
    bubbleTooltip: 'laBubble',
    noDataToChart: 'laNo data available to be charted.',
    pivotChartRequiresPivotMode: 'laPivot Chart requires Pivot Mode enabled.'
  };


  @Input() multipleSelection: boolean = false;
  rowSelection: any;

  selectedRow: any;


  route = '';
  constructor(private cdRef: ChangeDetectorRef, private cache: CacheService, private router: Router) {
    const split = router.url.split('/');
    this.route = split[2];
    // this.rowSelection = this.multipleSelection ? 'multiple' : 'single';
    //  this.pinnedBottomRowData = this.createData(1);
  }

  public exportAsExcel() {
    const fileName = this.route;//;localStorage.getItem('currentMenu');

    if (!this.rowFilterData) return;
    if (this.rowFilterData.length == 0) return;

    const dataNew = this.rowFilterData;

    let columns: any[] = [];

    this.columnDefs.forEach(o => {

      if (!(o.field == 'Cliente.Nombre'
        || o.field == 'Proveedor.Nombre')) {
        columns.push(o.field);
      } else {
        if (o.field.includes('Cliente'))
          columns.push('Cliente');
        else columns.push('Proveedor');
      }

    });

    const columnsKey = [];
    const first = dataNew[0];
    Object.keys(first).forEach(function (key) {
      columnsKey.push(key);
    });

    const columnsBad = [];
    columnsKey.forEach(o => {
      let ok = columns.includes(o);
      if (!ok)//&& !(o == 'Cliente' || o == 'Proveedor')) 
      {
        columnsBad.push(o);
      }
    });

    dataNew.forEach(o => {
      if (o.Cliente)
        o.Cliente = o.Cliente.Nombre;

      if (o.Proveedor)
        o.Cliente = o.Proveedor.Nombre;

      columnsBad.forEach(l => {
        if (!(l == 'Cliente' || l == 'Proveedor')) {
          delete o[l];
        }
      });
    });

    let wb: WorkBook;
    const ws: WorkSheet = XLSXUtils.json_to_sheet(dataNew, { header: columns });
    wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, fileName);
    writeFile(wb, `${fileName}${'.xlsx'}`);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (this.multipleSelection) {
      this.defaultColDef = {
        flex: 1,
        minWidth: 40,
        filter: false,
        resizable: true,
        sortable: true,
        floatingFilterComponentParams: {
          suppressFilterButton: true
        },
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn,
      };
      this.rowSelection = 'multiple';

    } else {
      this.defaultColDef = {
        flex: 1,
        //  minWidth: 50,
        filter: false,
        resizable: true,
        sortable: true,
        floatingFilterComponentParams: {
          suppressFilterButton: true
        }
      };
      this.rowSelection = 'single';
    }

  }

  onGridReady(params) {
    const lenght = this.columnDefs.length;
    const lenghtfalse = this.columnDefs.filter(o => !o.filter).length;

    if (lenghtfalse === lenght) { this.floatingFilter = false; } else {
      this.floatingFilter = true;
    }
    this.pagination = true;

    this.gridApi = params.api;

    if (this.SizeColumn) {
      params.api.sizeColumnsToFit();
    }


    //  params.api.autosizeAllColumns();
    this.gridColumnApi = params.columnApi;
    this.apiEvent.emit(this.gridApi);

    this.sumatorias();
  }

  changeData($event) {
    this.sumatorias();
  }

  sumatorias() {
    if (this.totals) {
      this.pinnedBottomData = [];
      this.pinnedBottomData.push(this.generatePinnedBottomData());
    }
  }

  doubleClick() {
    this.menuEvent.emit('modificar');
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      if (!this.multipleSelection) {
        const select = selectedRows[0];
        this.messageEvent.emit(select);
      } else {
        this.messageEvent.emit(selectedRows);
      }
    } else {
      if (this.multipleSelection) {
        const defaults: any[] = [];
        this.messageEvent.emit(defaults);
      }
    }
  }

  onCellValueChanged(params) {
    this.valueChanged.emit(params.data);
  }

  onCellKeyPress(e) {
    if (e.event.key == 'Delete') {
      this.keyPress.emit(e.data);
    }
  }

  generatePinnedBottomData() {
    let result = {};
    if (this.gridColumnApi) {
      this.gridColumnApi.getAllGridColumns().forEach(item => {
        if (item.colDef.filter === 'agNumberColumnFilter' && item.colId != "Folio") {
          result[item.colId] = 0;
          this.columnsWithAggregation.push(item.colDef.field);
        } else {
          result[item.colId] = null;
        }
      });
    }
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {
    //   this.columnsWithAggregation = ['Total'];
    this.columnsWithAggregation.forEach(element => {
      target[element] = 0;
      this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
        if (rowNode.data[element]) {
          target[element] += Number(rowNode.data[element]);
        }
      });
    })
    return target;
  }

  eventClickContext($event) {
    $event.node.setSelected(true);
  }

  mouseContext(dentro: boolean) {
    this.showContext = dentro;
  }

  contextMenuOption(funcion: string) {
    if (funcion == 'exportar') {
      this.exportAsExcel();
      return;
    }
    this.menuEvent.emit(funcion);
  }

  demostrateContext() {
    return !this.contextMenu || !this.showContext ? true : false;
  }

  onFilterChanged($event) {
    this.sortAndFilter();
  }
  onSortChanged($event) {
    this.sortAndFilter();
  }

  okTable($event) {
    this.rowFilterData = this.rowData;
  }

  sortAndFilter() {
    const array = [];
    this.gridApi.vet
    this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      array.push(rowNode.data);
    });
    this.rowFilterData = array;
  }



}


function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}


