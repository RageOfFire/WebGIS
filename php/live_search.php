<?php 
    include('./connect.php');

    if(isset($_GET['ma_loai'])){
        $ma_loai = strtolower($_GET['ma_loai']);

        $query = "select *,st_x(ST_Centroid(geom)) as x,st_y(ST_Centroid(geom)) as y from public.hien_trang where LOWER(ma_loai) like '%$ma_loai%'";
        $result = pg_query($conn, $query);
        $i = 0;
        if(pg_num_rows($result) > 0) {
            print("
            <table class='table table-hover'>
            <thead>
            <tr class='table-danger'>
            <th>STT</th>
            <th>DPHC</th>
            <th>Shape_leng</th>
            <th>Shape_area</th>
            <th>Mã loại</th>
            <th>Cài đặt</th>
            </tr>
            </thead> 
            <tbody>
            ");
            while($results = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                $link = "<button class='btn btn-info' onclick='di_den_diem(".$results['x'].",".$results['y'].")'>đi đến</button>";

                print("
                <tr class='table-dark table-hover'>
                <td>".$i++."</td>
                <td>".$results['dphc']."</td>
                <td>".$results['shape_leng']."</td>
                <td>".$results['shape_area']."</td>
                <td>".$results['ma_loai']."</td>
                <td>".$link."</td>
                </tr>
                ");
            }
            print("
            </tbody>
            </table>
            ");
        }else {
            print("Không tìm thấy");
        }
    }else {
        echo "Không tìm thấy";
    }

?>